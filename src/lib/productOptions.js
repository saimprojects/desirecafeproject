export function productOptions(item) {
  return (item?.options || []).map(option => typeof option === "string" ? { name: option, price: null } : option);
}
export function selectionKey(selections = []) {
  return JSON.stringify([...selections].map(({category, option}) => [category, option]).sort((a,b) => a[0].localeCompare(b[0])));
}
export function optionLabel(option = "", selections = []) {
  return selections.length ? selections.map(s => `${s.category}: ${s.option}`).join(" · ") : option;
}
export function validProductOption(item, name = "", selections = []) {
  if (!Array.isArray(selections)) return false;
  if (item?.option_mode !== "multi") return !selections.length && (name ? productOptions(item).some(option => option.name === name) : !item?.options_required);
  if (name || selections.some(s => !s || typeof s.category !== "string" || typeof s.option !== "string")) return false;
  const groups = item.option_groups || [];
  if (!groups.length || new Set(selections.map(s => s.category)).size !== selections.length) return false;
  return selections.every(s => groups.some(g => g.name === s.category && g.options.some(o => o.name === s.option))) &&
    groups.every(g => !g.required || selections.some(s => s.category === g.name));
}
export function optionPrice(item, name, selections = []) {
  if (item?.option_mode === "multi") {
    let cents = Math.round(Number(item.price || 0) * 100);
    for (const group of item.option_groups || []) {
      const selected = selections.find(s => s.category === group.name);
      const option = group.options.find(o => o.name === selected?.option);
      cents += Math.round(Number(option?.price || 0) * 100);
    }
    return cents / 100;
  }
  const option = productOptions(item).find(option => option.name === name);
  return Number(option?.price == null || option.price === "" ? item?.price || 0 : option.price);
}
