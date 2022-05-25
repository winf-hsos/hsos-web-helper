/* Teachable Machine Image Recoginition */

/* Use Teachable Machine Models */
/* global tmImage speechCommands */

var predictionType;
var webcam;
var model;

// For image classification (webcam)
var maxPredictions;
var predictionCallback;

export async function setupWebcam(params) {

    var element = "webcam";
    var size = 400;
    var device = "";

   
    if(params.element !== "undefined") {
        element = params.element;
    }

    if(params.size !== "undefined") {
        size = params.size;
    }
    
    if(params.device !== "undefined") {
        device = params.device;
    }

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam

    const devices = await navigator.mediaDevices.enumerateDevices()
    console.log("Found the following video devices:")
    console.dir(devices);
    for (let i = 0; i < devices.length; i++) {
        if (devices[i].kind == "videoinput") {
            console.log(devices[i].label + ":");
            console.log(devices[i].deviceId);
        }
    }

    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip

    if (device == "") {
        await webcam.setup(); // request access to the webcam
    }
    else {
        console.log("Using camera with id >" + device + "<");
        await webcam.setup({ deviceId: device })
    }

    await webcam.play();
    document.getElementById("webcam").appendChild(webcam.canvas);
}

export async function loop() {
    let prediction;

    // Make the prediction and call the callback function
    if (predictionType === "teachable_machine_image") {
        // Update the webcam frame
        webcam.update();

        prediction = await predictObjectInImage();
        predictionCallback(prediction);

        // Request next frame
        window.requestAnimationFrame(loop);


    } else if (predictionType === "face_recognition") {
        prediction = await predictFace();
        predictionCallback(prediction);
        loop();
    } else {

        // Update the webcam frame
        webcam.update();
        window.requestAnimationFrame(loop);


    }
}

export async function loadImageModel(url) {
    const modelURL = url + "model.json";
    const metadataURL = url + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// run the webcam image through the image model
export async function predictObjectInImage() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    let result = {};

    for (let i = 0; i < maxPredictions; i++) {
        result[prediction[i].className] = prediction[i].probability.toFixed(2);
    }

    return result;
}

export function startPrediction(callback, type = "teachable_machine_image") {
    predictionCallback = callback;
    predictionType = type;
    loop();
}
