clearLog();
log("Test")

function printValue() {
    let text = getInput("myInput");
    writeLog(text)
}

tf.initDevices(done);

function done(devices) {
    console.dir(devices);
}