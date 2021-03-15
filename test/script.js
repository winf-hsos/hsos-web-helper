clearLog();
log("Test")

function printValue() {
    let text = getInput("myInput");
    log(text)
}

tf.initDevices(done);

function done(devices) {
    console.dir(devices);
}