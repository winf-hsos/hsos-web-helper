clearLog();
writeLog("Test")

function printValue() {
    let text = getInput("myInput");
    writeLog(text)
}

//tf.initDevices(done);

function done(devices) {
    console.dir(devices);
}

async function start() {

    
    //await tm.image.setupWebcam({ device : "14f09b726ae0d308ce60d3d1114b30df3f0254d1fedd0408c0c372e24cf407fd"});
    await tm.image.setupWebcam({ device : "f72e2c8acf1c95326e495dc5bebd6bec97408a0d9edd0570270ff5392be5dc88"});
    await tm.image.loadImageModel("https://teachablemachine.withgoogle.com/models/Xv-Si5Rqr/");
    tm.image.startPrediction(newPrediction)
    //tm.image.loop();
}

function newPrediction(prediction) {
    console.dir(prediction);
}

start()