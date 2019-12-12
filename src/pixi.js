import * as PIXI from "pixi.js";
import Slider from "./components/slider";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container
//const app = new PIXI.Application(window.innerWidth, window.innerHeight);
let app;
let slider;
const appMargin = 20; // App needs to smaller than the window width to avoid showing scroll bars.

setupDemo();

// Create some text. Not important for fullscreen
function setupDemo() {
  app = new PIXI.Application({
    width: window.innerWidth - appMargin,
    height: window.innerHeight - appMargin,
    // resizeTo: window,
    resolution: devicePixelRatio
  });
  document.body.appendChild(app.view);

  slider = new Slider(app.stage);

  //app.

  app.stage.height;

  app.stage.addChild(slider);
  // Create some text that we can update
  // Update the text every pixi frame or 'tick'
  // app.ticker.add(updateText);
  app.ticker.add(updateTicker);
}

// Fullscreen in pixi is resizing the renderer to be window.innerWidth by window.innerHeight
window.addEventListener("resize", function() {
  app.renderer.resize(
    window.innerWidth - appMargin,
    window.innerHeight - appMargin
  );
  app.stage.height = window.innerHeight - appMargin;
  app.stage.width = window.innerWidth - appMargin;
  slider.resize(app.stage);
});

function updateTicker() {
  //  console.log("tick");
}

const button = document.querySelector("#start");

const handler = async () => {
  console.log("on click button");

  navigator.usb.getDevices().then(devices => {
    console.log("Total devices: " + devices.length);
    devices.forEach(device => {
      console.log(
        "Product name: " +
          device.productName +
          ", serial number " +
          device.serialNumber
      );
    });
  });

  /*
  const device = await navigator.usb.requestDevice({
    filters: [{ vendorId: 1155 }]
  });



*/

  var device;

  navigator.usb
    .requestDevice({ filters: [{ vendorId: 1155 }] })
    .then(selectedDevice => {
      device = selectedDevice;

      return device.open(); // Begin a session.
    })
    .then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
    .then(() => {
      console.log("got device", device);
      device.claimInterface(1);
    }) // Request exclusive control over interface #2.
    .then(() =>
      device.controlTransferOut({
        requestType: "class",
        recipient: "interface",
        request: 0x22,
        value: 0x01,
        index: 0x02
      })
    ) // Ready to receive data
    /*.then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
    .then(result => {
      let decoder = new TextDecoder();
      console.log("Received: " + decoder.decode(result.data));
    })
    */
    .catch(error => {
      console.error(error);
    });

  console.log("got device", device);
};

function sendText(device, text) {}

button.addEventListener("click", handler);
