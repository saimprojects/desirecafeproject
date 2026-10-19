export function productOptions(item) {
  return (item?.options || []).map(option => typeof option === "string" ? { name: option, price: null } : option);
}
export function validProductOption(item, name = "") {
  return name ? productOptions(item).some(option => option.name === name) : !item?.options_required;
}
export function optionPrice(item, name) {
  const option = productOptions(item).find(option => option.name === name);
  return Number(option?.price == null || option.price === "" ? item?.price || 0 : option.price);
}
