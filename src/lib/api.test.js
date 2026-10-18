import { afterEach, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});
const response = (status, data) => ({
  ok: status < 400,
  status,
  json: async () => data,
});

it("refreshes a stale CSRF token and retries a rejected POST once", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response(200, { csrf: "old-token" }))
    .mockResolvedValueOnce(
      response(403, { code: "csrf_failed", error: "expired" }),
    )
    .mockResolvedValueOnce(response(200, { csrf: "fresh-token" }))
    .mockResolvedValueOnce(response(200, { username: "admin" }));
  vi.stubGlobal("fetch", fetcher);
  const { api } = await import("./api");
  await expect(api("login/", { username: "admin" })).resolves.toEqual({
    username: "admin",
  });
  expect(fetcher).toHaveBeenCalledTimes(4);
  expect(fetcher.mock.calls[3][1].headers["X-CSRFToken"]).toBe("fresh-token");
});

it("does not loop when an origin is rejected, or retry unrelated permission errors", async () => {
  const fetcher = vi
    .fn()
    .mockResolvedValueOnce(response(200, { csrf: "old-token" }))
    .mockResolvedValueOnce(
      response(403, { code: "csrf_failed", error: "rejected" }),
    )
    .mockResolvedValueOnce(response(200, { csrf: "fresh-token" }))
    .mockResolvedValueOnce(
      response(403, { code: "csrf_failed", error: "rejected" }),
    );
  vi.stubGlobal("fetch", fetcher);
  const { api } = await import("./api");
  await expect(api("login/", {})).rejects.toThrow("rejected");
  expect(fetcher).toHaveBeenCalledTimes(4);
  fetcher
    .mockReset()
    .mockResolvedValueOnce(response(200, { csrf: "new-token" }))
    .mockResolvedValueOnce(response(403, { error: "Not allowed" }));
  await expect(api("settings/", {})).rejects.toThrow("Not allowed");
  expect(fetcher).toHaveBeenCalledTimes(2);
});
