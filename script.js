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

async function fetchPrice() {
const tier = document.getElementById("tier").value;
const city = document.getElementById("city").value;
const inputRune = document.getElementById("rune");
const inputSoul = document.getElementById("soul");
const inputRelic = document.getElementById("relic");

let rune = 0, soul = 0, relic = 0, prices = [];

const [response] = await Promise.allSettled([
    fetch(`https://west.albion-online-data.com/api/v2/stats/prices/${tier}_RUNE,${tier}_SOUL,${tier}_RELIC?locations=${city}`),
    new Promise((resolve) => setTimeout(resolve, 100)),
]);

if (response.status === "fulfilled") {
    prices = await response.value.json();
} else {
    throw new Error(response.reason);
}

console.log(prices);
rune = prices[1] ? prices[1].sell_price_min : 0;
soul = prices[2] ? prices[2].sell_price_min : 0;
relic = prices[0] ? prices[0].sell_price_min : 0;

inputRune.value = rune;
inputSoul.value = soul;
inputRelic.value = relic;
}