import { api } from "./api";

const items = menu => (menu.categories || []).flatMap(group => group.items);
const mode = item => item.option_mode || "single";
const options = values => (values || []).map(value => {
  const option = typeof value === "string" ? {name:value} : value;
  return {name:option.name.trim(), price:option.price == null || option.price === "" ? null : Number(option.price).toFixed(2)};
});
const groups = values => (values || []).map(group => ({name:group.name.trim(), required:!!group.required, options:options(group.options)}));
const same = (a,b) => JSON.stringify(a) === JSON.stringify(b);

export async function saveMenuItem(payload) {
  // Older deployments accept unknown fields but silently discard multi-category options.
  const before = await api("menu/");
  const supportsMulti = before.features?.includes("multi_category_options") || items(before).some(item =>
    typeof item.option_mode === "string" && Array.isArray(item.option_groups));
  if (mode(payload) === "multi" && !supportsMulti) {
    throw new Error("The live backend has not been updated for Multi Category Options. Deploy the latest backend and migration 0006, then retry. Your edits are still open.");
  }
  const result = await api("menu-item/", payload);
  const savedId = result.id || payload.id;
  try {
    const after = await api("menu/");
    const saved = items(after).find(item => item.id === savedId);
    const matches = saved && mode(saved) === mode(payload) &&
      saved.name === payload.name.trim() && saved.description === (payload.description || "").trim() &&
      Number(saved.category) === Number(payload.category) && Number(saved.price) === Number(payload.price) &&
      saved.available === (payload.available ?? true) && saved.popular === !!payload.popular &&
      (mode(payload) === "multi"
        ? same(groups(saved.option_groups), groups(payload.option_groups))
        : same(options(saved.options), options(payload.options)) && !!saved.options_required === !!payload.options_required);
    if (!matches) throw new Error("The server did not return your saved changes. The backend may be outdated or connected to the wrong deployment. Your edits are still open; please retry after the backend is updated.");
    return saved;
  } catch (error) {
    error.savedId = savedId;
    throw error;
  }
}
