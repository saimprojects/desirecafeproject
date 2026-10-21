import { productOptions, optionPrice, validProductOption } from "../lib/productOptions";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus } from "lucide-react";
import { aed } from "../lib/api";
import "../product-picker.css";

export function ProductPicker({ item, shop, close }) {
  const dialog = useRef(null);
  const [option, setOption] = useState("");
  const [selections, setSelections] = useState([]);
  const multi = item.option_mode === "multi";
  const [quantity, setQuantity] = useState(1);
  const options = productOptions(item);
  const ready = item.available && shop.data?.settings?.is_open && !shop.error && validProductOption(item, option, selections);
  useEffect(() => {
    const node = dialog.current;
    node.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { node.close(); document.body.style.overflow = oldOverflow; };
  }, []);
  return createPortal(<dialog ref={dialog} className="product-picker" aria-labelledby={`product-title-${item.id}`} onCancel={close} onClick={e => { if(e.target === dialog.current) close(); }}>
    <div className="product-picker-inner">
      <button type="button" className="picker-close" aria-label="Close product options" onClick={close}><X /></button>
      <span className="picker-eyebrow">MAKE IT YOURS</span>
      <h2 id={`product-title-${item.id}`}>{item.name}</h2>
      {item.image && <img src={item.image} alt={item.name} className="product-photo picker-photo" />}
      <p>{item.description}</p><strong>{aed(optionPrice(item, option, selections))} each</strong>
      <form onSubmit={e => {e.preventDefault(); if(ready && (multi ? shop.add(item, null, quantity, "", selections) : shop.add(item, null, quantity, option)) !== false) close();}}>
        {!multi && options.length > 0 && <fieldset><legend>Choose an option{item.options_required ? " (required)" : " (optional)"}</legend><div className="picker-options">
          {!item.options_required && <label className={!option ? "selected" : ""}><input type="radio" name="product-option" checked={!option} onChange={() => setOption("")} /><span>No option</span><small>{aed(item.price)}</small></label>}
          {options.map(value => <label key={value.name} className={option === value.name ? "selected" : ""}>
            <input type="radio" aria-label={value.name} name="product-option" value={value.name} checked={option === value.name} required={item.options_required} onChange={() => setOption(value.name)} /><span>{value.name}</span><small>{aed(optionPrice(item, value.name))}</small>
          </label>)}
        </div></fieldset>}
        {multi && (item.option_groups || []).map((group, index) => {
          const selected = selections.find(s => s.category === group.name)?.option || "";
          const choose = value => setSelections(old => [...old.filter(s => s.category !== group.name), ...(value ? [{category: group.name, option: value}] : [])]);
          return <fieldset key={group.name}>
            <legend>{group.name} <small>{group.required ? "(required)" : "(optional)"}</small></legend>
            <div className="picker-options picker-category-options">
              {!group.required && <label className={!selected ? "selected" : ""}><input type="radio" name={`category-${index}`} checked={!selected} onChange={() => choose("")} /><span>No option</span></label>}
              {group.options.map(value => <label key={value.name} className={selected === value.name ? "selected" : ""}>
                <input type="radio" name={`category-${index}`} checked={selected === value.name} required={group.required} onChange={() => choose(value.name)} />
                <span>{value.name}</span><small>{Number(value.price || 0) ? `+ ${aed(value.price)}` : "Included"}</small>
              </label>)}
            </div>
          </fieldset>;
        })}
        <div className="picker-quantity"><span>Quantity</span><div>
          <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity(q => q - 1)}><Minus size={18}/></button>
          <output aria-label="Selected quantity">{quantity}</output>
          <button type="button" aria-label="Increase quantity" disabled={quantity >= 50} onClick={() => setQuantity(q => q + 1)}><Plus size={18}/></button>
        </div></div>
        <button className="picker-add" type="submit" disabled={!ready}>Add {quantity} to cart · {aed(optionPrice(item, option, selections) * quantity)}</button>
        {!item.available && <p role="status">This item is currently unavailable.</p>}
      </form>
    </div>
  </dialog>, document.body);
}
