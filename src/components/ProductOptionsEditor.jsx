import "../product-picker.css";
import { productOptions } from "../lib/productOptions";

function Options({ options, update, prefix = "", basePrice, extra = false }) {
  return <>
    {options.map((option, index) => <div className="option-edit-row" key={index}>
      <input aria-label={`${prefix}Option ${index + 1}`} placeholder="Option name" maxLength={100} required value={option.name} onChange={e => update(options.map((value, i) => i === index ? {...value, name:e.target.value} : value))} />
      <input type="number" min="0" max="999999.99" step="0.01" aria-label={`${prefix}Option ${index + 1} ${extra ? "extra price" : "price"} (AED)`} placeholder={extra ? "Extra: 0.00 AED" : `Base: ${basePrice || "0.00"} AED`} value={option.price ?? ""} onChange={e => update(options.map((value, i) => i === index ? {...value, price:e.target.value || null} : value))} />
      <button type="button" className="text-button" aria-label={`${prefix}Remove option ${index + 1}`} onClick={() => update(options.filter((_, i) => i !== index))}>Remove</button>
    </div>)}
    <button type="button" className="outline-button" disabled={options.length >= 30} onClick={() => update([...options, {name:"", price:null}])}>Add option</button>
  </>;
}

export function ProductOptionsEditor({ item, field }) {
  const multi = item.option_mode === "multi";
  const groups = item.option_groups || [];
  const updateGroup = (index, changes) => field("option_groups", groups.map((g, i) => i === index ? {...g, ...changes} : g));
  return <section className="product-options-editor">
    <h3>Product options</h3>
    <div className="option-mode-toggle" role="radiogroup" aria-label="Product option mode">
      <span className={`option-mode-slider ${multi ? "multi" : ""}`} aria-hidden="true" />
      {[['single', 'Single Category Option'], ['multi', 'Multi Category Option']].map(([value, label]) => <label key={value} className={(multi ? 'multi' : 'single') === value ? 'active' : ''}>
        <input type="radio" name="option-mode" value={value} checked={(multi ? 'multi' : 'single') === value} onChange={() => field("option_mode", value)} />{label}
      </label>)}
    </div>
    {multi ? <>
      <p className="muted">Create categories such as Coffee Beans and Hot or Iced. Customers choose one option per category. Extra prices are added to the product base price; leave blank for no extra charge.</p>
      {groups.map((group, index) => <fieldset className="option-category-editor" key={index}>
        <legend>Option category {index + 1}</legend>
        <label>Category name<input required maxLength={100} placeholder="e.g. Coffee Beans" value={group.name} onChange={e => updateGroup(index, {name:e.target.value})} /></label>
        <label className="check-label"><input type="checkbox" checked={!!group.required} onChange={e => updateGroup(index, {required:e.target.checked})} />Option Compulsory</label>
        <Options options={group.options} update={options => updateGroup(index, {options})} prefix={`Category ${index + 1} `} extra />
        <button type="button" className="text-button remove-option-category" onClick={() => field("option_groups", groups.filter((_, i) => i !== index))}>Remove category</button>
      </fieldset>)}
      <button type="button" className="outline-button" disabled={groups.length >= 10} onClick={() => field("option_groups", [...groups, {name:"", required:false, options:[{name:"", price:null}]}])}>Add option category</button>
    </> : <>
      <p className="muted">Customers can choose one option. Optional price is the full unit price in AED. Leave blank to use the product price.</p>
      <Options options={productOptions(item)} update={options => field("options", options)} basePrice={item.price} />
      <label className="check-label"><input type="checkbox" checked={!!item.options_required} onChange={e => field("options_required", e.target.checked)} />Option Compulsory</label>
    </>}
  </section>;
}
