// @vitest-environment jsdom
import { it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ShopProvider, useShop } from "./ShopContext";
vi.mock("react-hot-toast",()=>({default:{success:vi.fn(),error:vi.fn()}}));
const item={id:1,name:"Coffee",price:"10.00",available:true,options:["Hot","Cold"]};
vi.mock("../lib/usePolling",()=>({usePolling:()=>({data:{settings:{is_open:true},categories:[{items:[{id:1,name:"Coffee",price:"10.00",available:true,options:["Hot","Cold"]}]}]},error:null})}));
function CartProbe() {
  const shop=useShop();
  return <><button onClick={()=>shop.add(item,null,2,"Hot")}>Hot</button><button onClick={()=>shop.add(item,null,3,"Cold")}>Cold</button><output data-testid="lines">{JSON.stringify(shop.lines)}</output><output data-testid="total">{shop.subtotal}</output></>;
}
beforeEach(()=>localStorage.clear());
afterEach(cleanup);
it("merges matching choices, separates other choices and restores quantities",()=>{
  const view=render(<ShopProvider><CartProbe/></ShopProvider>);
  fireEvent.click(screen.getByText("Hot"));fireEvent.click(screen.getByText("Cold"));fireEvent.click(screen.getByText("Hot"));
  let lines=JSON.parse(screen.getByTestId("lines").textContent);
  expect(lines.map(x=>[x.option,x.quantity,x.valid])).toEqual([["Hot",4,true],["Cold",3,true]]);
  expect(screen.getByTestId("total").textContent).toBe("70");
  view.unmount();render(<ShopProvider><CartProbe/></ShopProvider>);
  lines=JSON.parse(screen.getByTestId("lines").textContent);
  expect(lines.map(x=>x.quantity)).toEqual([4,3]);
});
it("blocks an obsolete saved option from checkout",()=>{
  localStorage.setItem("desires-cart",JSON.stringify([{item_id:1,quantity:2,option:"Removed",addon_id:null}]));
  render(<ShopProvider><CartProbe/></ShopProvider>);
  expect(JSON.parse(screen.getByTestId("lines").textContent)[0].valid).toBe(false);
});
