require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const nightmare = require("nightmare")();

// const url =
//   "https://www.amazon.com/SanDisk-400GB-microSDXC-Memory-Adapter/dp/B08GYG5SVQ";

const args = process.argv.slice(2);
const url = args[0];
const minPrice = args[1];

checkPrice();

async function checkPrice() {
  const priceString = await nightmare
    .goto(url)
    .wait("#price_inside_buybox")
    .evaluate(() => document.getElementById("price_inside_buybox").innerText)
    .end();

  const priceNumber = parseFloat(priceString.replace("$", ""));

  if (priceNumber < minPrice) {
      console.log("Price is low")
    sendEmail(
      "Price Is Low",
      `The price on ${url} has dropped below ${minPrice}`
    );
  }
}

function sendEmail(subject, body) {
  const email = {
    to: "xeyafe9534@xhypm.com",
    from: "d.mackrell@gmail.com",
    subject: subject,
    text: body,
    html: body,
  };

  return sgMail.send(email);
}
