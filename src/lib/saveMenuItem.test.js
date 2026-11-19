import { afterEach, expect, it, vi } from "vitest";
import { api } from "./api";
import { saveMenuItem } from "./saveMenuItem";
vi.mock("./api", () => ({api:vi.fn()}));
afterEach(() => vi.resetAllMocks());
const payload = {id:1,category:1,name:"Coffee",description:"",price:"14.00",available:true,popular:false,option_mode:"multi",option_groups:[{name:"Beans",required:true,options:[{name:"Brazil",price:null}]}]};
const menu = item => ({categories:[{items:[item]}]});
it("rejects an old backend before it can silently discard multi-category edits", async () => {
  api.mockResolvedValue(menu({id:1,options:["Hot"]}));
  await expect(saveMenuItem(payload)).rejects.toThrow("Deploy the latest backend");
  expect(api.mock.calls).toEqual([["menu/"]]);
});
it("does not report success if a successful POST failed to persist the requested mode", async () => {
  const original = {...payload, option_mode:"single",option_groups:[]};
  api.mockResolvedValueOnce(menu(original)).mockResolvedValueOnce({ok:true,id:1}).mockResolvedValueOnce(menu(original));
  await expect(saveMenuItem(payload)).rejects.toMatchObject({savedId:1,message:expect.stringContaining("did not return your saved changes")});
});
it("verifies saved choices after reload, accepting server normalization", async () => {
  const normalized = {...payload, option_groups:[{name:"Beans",required:true,options:[{name:"Brazil",price:"2.00"}]}]};
  api.mockResolvedValueOnce(menu(payload)).mockResolvedValueOnce({ok:true,id:1}).mockResolvedValueOnce(menu(normalized));
  await expect(saveMenuItem({...payload,option_groups:[{name:" Beans ",required:true,options:[{name:" Brazil ",price:"2"}]}]})).resolves.toEqual(normalized);
});
it("supports the first product on a backend advertising multi-category support", async () => {
  api.mockResolvedValueOnce({categories:[],features:["multi_category_options"]}).mockResolvedValueOnce({ok:true,id:1}).mockResolvedValueOnce(menu(payload));
  await expect(saveMenuItem({...payload,id:undefined})).resolves.toEqual(payload);
});
it("retains the new item ID when verification fails so retry does not create a duplicate", async () => {
  api.mockResolvedValueOnce(menu(payload)).mockResolvedValueOnce({ok:true,id:42}).mockRejectedValueOnce(new Error("connection failed"));
  await expect(saveMenuItem({...payload,id:undefined})).rejects.toMatchObject({savedId:42});
});
it("detects lost single-category deletions even when the POST returns success", async () => {
  const single = {...payload,option_mode:"single",options:[],options_required:false};
  api.mockResolvedValueOnce(menu(single)).mockResolvedValueOnce({ok:true,id:1}).mockResolvedValueOnce(menu({...single,options:["Hot"]}));
  await expect(saveMenuItem(single)).rejects.toThrow("did not return your saved changes");
});
