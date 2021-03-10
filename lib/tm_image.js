/* Teachable Machine Image Recoginition */

/* Use Teachable Machine Models */
/* global tmImage speechCommands */

var predictionType;
var webcam;
var model;

// For image classification (webcam)
var maxPredictions;
var predictionCallback;

async function setupWebcam(element = "webcam", size = 400) {
    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(400, 400, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();

    document.getElementById(element).appendChild(webcam.canvas);
}

async function loop() {
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
    }
}

async function loadImageModel(url) {
    const modelURL = url + "model.json";
    const metadataURL = url + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// run the webcam image through the image model
async function predictObjectInImage() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);

    let result = {};

    for (let i = 0; i < maxPredictions; i++) {
        result[prediction[i].className] = prediction[i].probability.toFixed(2);
    }

    return result;
}

function startPrediction(callback, type = "teachable_machine_image") {
    predictionCallback = callback;
    predictionType = type;
    loop();
}
