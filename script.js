function calculate(values) {
const getValue = (key) => parseFloat(values[key].value);
const base = getValue("base");
const materials = [getValue("rune"), getValue("soul"), getValue("relic")];
const multi = getValue("type");

let total = 0,
    labelId = 0,
    labelText = 0,
    prevMaterial = 0,
    i = 0,
    price = 0;

while (i < 3) {
    price = materials[i];
    prevMaterial += price * multi || 0;

    labelId = (i === 0) ? "runeLabel" : (i === 1) ? "soulLabel" : (i === 2) ? "relicLabel" : 0;
    labelText = (i === 0) ? "Enchanting to .1" : (i === 1) ? "Enchanting to .2" : (i === 2) ? "Enchanting to .3" : "";

    total = base + prevMaterial;
    document.getElementById(labelId).innerHTML = `${labelText} will cost <span class="spec">${total.toLocaleString("en-US")}</span> silver`;
    i++;
}
}