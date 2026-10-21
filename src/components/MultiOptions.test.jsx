// @vitest-environment jsdom
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { useState } from "react";
import { render, screen, fireEvent, cleanup, within } from "@testing-library/react";
import { ProductPicker } from "./ProductPicker";
import { ProductOptionsEditor } from "./ProductOptionsEditor";
import { ShopProvider, useShop } from "./ShopContext";
import { validProductOption, optionPrice } from "../lib/productOptions";
const { item } = vi.hoisted(() => ({item: {
  id:1,name:"Americano",available:true,price:"14.00",option_mode:"multi",
  option_groups:[
    {name:"Coffee Beans",required:true,options:[{name:"Brazil",price:null},{name:"El Salvador",price:"2.00"}]},
    {name:"Hot or Iced",required:true,options:[{name:"Hot",price:null},{name:"Iced",price:"1.00"}]},
    {name:"Extras",required:false,options:[{name:"Shot",price:"3.00"}]},
  ],
}}));
vi.mock("../lib/usePolling", () => ({usePolling:() => ({data:{settings:{is_open:true},categories:[{items:[item]}]},error:null})}));
vi.mock("react-hot-toast", () => ({default:{success:vi.fn(),error:vi.fn()}}));
beforeEach(() => {
  localStorage.clear();
  HTMLDialogElement.prototype.showModal = function() { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function() { this.removeAttribute("open"); };
});
afterEach(cleanup);
function Probe() {
  const shop = useShop();
  const [open,setOpen] = useState(false);
  return <><button onClick={() => setOpen(true)}>Customize</button>{open && <ProductPicker item={item} shop={shop} close={() => setOpen(false)}/>}<output data-testid="lines">{JSON.stringify(shop.lines)}</output><output data-testid="total">{shop.subtotal}</output></>;
}
function choose(beans = "El Salvador") {
  fireEvent.click(screen.getByText("Customize"));
  fireEvent.click(screen.getByLabelText(new RegExp(beans)));
  fireEvent.click(screen.getByLabelText(/^Iced/));
  fireEvent.click(screen.getByRole("button",{name:/Add 1 to cart/}));
}
it("requires each compulsory category, adds prices, merges matching combinations and restores the cart", () => {
  const view = render(<ShopProvider><Probe/></ShopProvider>);
  fireEvent.click(screen.getByText("Customize"));
  expect(screen.getByRole("button",{name:/Add 1 to cart/}).disabled).toBe(true);
  fireEvent.click(screen.getByLabelText(/^El Salvador/));
  expect(screen.getByRole("button",{name:/Add 1 to cart/}).disabled).toBe(true);
  fireEvent.click(screen.getByLabelText(/^Iced/));
  expect(screen.getByRole("button",{name:/Add 1 to cart/}).textContent).toContain("17.00");
  fireEvent.click(screen.getByLabelText(/^Shot/));
  expect(screen.getByRole("button",{name:/Add 1 to cart/}).textContent).toContain("20.00");
  fireEvent.click(screen.getByLabelText("No option"));
  fireEvent.click(screen.getByRole("button",{name:/Add 1 to cart/}));
  choose(); choose("Brazil");
  const lines = JSON.parse(screen.getByTestId("lines").textContent);
  expect(lines.map(l => [l.quantity,l.price,l.valid])).toEqual([[2,17,true],[1,15,true]]);
  expect(lines[0].option_label).toContain("Coffee Beans: El Salvador");
  expect(screen.getByTestId("total").textContent).toBe("49");
  view.unmount();render(<ShopProvider><Probe/></ShopProvider>);
  expect(JSON.parse(screen.getByTestId("lines").textContent)).toEqual(lines);
});
it("rejects stale, duplicate, and legacy choices after a mode change", () => {
  const choices = [{category:"Coffee Beans",option:"Brazil"},{category:"Hot or Iced",option:"Hot"}];
  expect(validProductOption(item,"",choices)).toBe(true);
  expect(validProductOption(item,"",[...choices,choices[0]])).toBe(false);
  expect(validProductOption(item,"",[{category:"Coffee Beans",option:"Removed"},choices[1]])).toBe(false);
  expect(validProductOption(item,"Hot")).toBe(false);
  expect(validProductOption({options:[]},"",choices)).toBe(false);
  expect(optionPrice(item,"",choices)).toBe(14);
});
function Editor() {
  const [product,setProduct] = useState({options:[{name:"Original",price:"18.00"}],options_required:true});
  return <ProductOptionsEditor item={product} field={(key,value) => setProduct(old => ({...old,[key]:value}))}/>;
}
it("keeps single options while switching modes and allows category-level required choices", () => {
  render(<Editor/>);
  fireEvent.click(screen.getByLabelText("Multi Category Option"));
  fireEvent.click(screen.getByRole("button",{name:"Add option category"}));
  fireEvent.change(screen.getByLabelText("Category name"),{target:{value:"Coffee Beans"}});
  fireEvent.change(screen.getByLabelText("Category 1 Option 1"),{target:{value:"Brazil"}});
  fireEvent.click(screen.getByLabelText("Option Compulsory"));
  fireEvent.click(screen.getByRole("button",{name:"Add option category"}));
  expect(screen.getAllByLabelText("Option Compulsory").map(el => el.checked)).toEqual([true,false]);
  fireEvent.click(screen.getByLabelText("Single Category Option"));
  expect(screen.getByLabelText("Option 1").value).toBe("Original");
  fireEvent.click(screen.getByLabelText("Multi Category Option"));
  expect(screen.getByLabelText("Category 1 Option 1").value).toBe("Brazil");
  fireEvent.click(within(screen.getByRole("group",{name:"Option category 2"})).getByRole("button",{name:"Remove category"}));
  expect(screen.getAllByLabelText("Category name")).toHaveLength(1);
});
