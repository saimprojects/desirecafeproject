// @vitest-environment jsdom
import { afterEach, it, expect, vi } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { PasswordField } from "./PasswordField";
import { ChangePassword } from "./ChangePassword";
import { api } from "../lib/api";
vi.mock("../lib/api", () => ({api:vi.fn()}));
afterEach(() => { cleanup(); vi.clearAllMocks(); });
it("toggles password visibility without submitting the form", () => {
  const submit = vi.fn(e => e.preventDefault());
  render(<form onSubmit={submit}><PasswordField label="Password" defaultValue="example" /></form>);
  const input=screen.getByLabelText("Password");
  expect(input.type).toBe("password");
  fireEvent.click(screen.getByRole("button",{name:"Show password"}));
  expect(input.type).toBe("text");
  fireEvent.click(screen.getByRole("button",{name:"Hide password"}));
  expect(input.type).toBe("password");
  expect(submit).not.toHaveBeenCalled();
});
it("checks confirmation, sends passwords and clears fields on success", async () => {
  api.mockResolvedValue({ok:true});
  render(<ChangePassword />);
  fireEvent.change(screen.getByLabelText("Current password"),{target:{value:"old-password"}});
  fireEvent.change(screen.getByLabelText("New password"),{target:{value:"new-password"}});
  fireEvent.change(screen.getByLabelText("Confirm new password"),{target:{value:"different-password"}});
  fireEvent.click(screen.getByRole("button",{name:"Change password"}));
  expect(screen.getByRole("alert").textContent).toContain("do not match");
  expect(api).not.toHaveBeenCalled();
  fireEvent.change(screen.getByLabelText("Confirm new password"),{target:{value:"new-password"}});
  fireEvent.click(screen.getByRole("button",{name:"Change password"}));
  await screen.findByRole("status");
  expect(api).toHaveBeenCalledWith("change-password/",{current_password:"old-password",new_password:"new-password",confirm_password:"new-password"});
  expect(screen.getByLabelText("Current password").value).toBe("");
  expect(screen.getByLabelText("New password").value).toBe("");
});
it("shows server errors without claiming success", async () => {
  api.mockRejectedValue(new Error("Current password is incorrect."));
  render(<ChangePassword />);
  for (const label of ["Current password","New password","Confirm new password"]) fireEvent.change(screen.getByLabelText(label),{target:{value:"password-value"}});
  fireEvent.click(screen.getByRole("button",{name:"Change password"}));
  await waitFor(() => expect(screen.getByRole("alert").textContent).toBe("Current password is incorrect."));
  expect(screen.queryByRole("status")).toBeNull();
});
