const handler = async () => {
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

// Run usb start up only after user interaction.
const button = document.querySelector("#start");
button.addEventListener("click", handler);
