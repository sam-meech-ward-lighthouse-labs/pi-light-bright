const express = require('express');
const Gpio = require('onoff').Gpio;

const redLED = new Gpio(2, 'out');
const greenLED = new Gpio(3, 'out');
const blueLED = new Gpio(4, 'out');

function turnOff() {
  redLED.writeSync(0);
  greenLED.writeSync(0);
  blueLED.writeSync(0);
}

const app = express();

app.use(express.static('public'));

app.use("/", (req, res, next) => {
  turnOff();
  next();
})

app.post("/red", (req, res) => {
  redLED.writeSync(1);
  res.send("cool");
});

app.post("/green", (req, res) => {
  greenLED.writeSync(1);
  res.send("cool");
});

app.post("/blue", (req, res) => {
  blueLED.writeSync(1);
  res.send("cool");
});


app.listen(8833, () => console.log("pi light bright"));