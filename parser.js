const nightmare = require("nightmare")();

const id = "price_inside_buybox";
const url =
  "https://www.amazon.com/SanDisk-400GB-microSDXC-Memory-Adapter/dp/B08GYG5SVQ";

checkPrice()

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#price_inside_buybox")
    .evaluate(() => document.getElementById(id).innerText)
    .end();

    const priceNumber = parseFloat(priceString.replace('$', ''))

    if (priceNumber < 50) {
        console.log("It is cheap")
    } else {
        console.log("It is expensive")
    }
}
