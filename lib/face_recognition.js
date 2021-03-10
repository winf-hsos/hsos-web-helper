/* Face Recognition with face API.js */
/* global faceapi */

var canvas, video, displaySize;

export async function loadFaceRecognitionModels() {
    log("Loading models...");

    const MODEL_URL =
        "https://s3.amazonaws.com/nicolas.meseth/digitization/face_api_models/";

    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);

    log("Done loading models!");
}

export async function setupCameraForFaceRecognition() {
    video = document.querySelector("#webcam");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}

export function setupCanvas() {
    displaySize = { width: video.videoWidth, height: video.videoHeight };

    // resize the overlay canvas to the input dimensions
    canvas = document.getElementById("overlay");
    faceapi.matchDimensions(canvas, displaySize);
}

export async function predictFace() {
    const detections = await faceapi
        .detectAllFaces(video)
        .withFaceLandmarks()
        .withFaceDescriptors();

    var result = [];

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < detections.length; i++) {
        result.push(detections[i].descriptor);

        // Draw the bounding boxes into the stream
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }

    return result;
}

export var faceMatcher;
export var labeledImageDescriptors = [];

export async function addTrainingImage(imageUrl, label) {
    log("Adding image to training data...");

    var referenceImage = new Image();
    referenceImage.crossOrigin = "anonymous";
    referenceImage.src = imageUrl;

    const results = await faceapi
        .detectAllFaces(referenceImage)
        .withFaceLandmarks()
        .withFaceDescriptors();

    if (!results.length) {
        log("No face found on image!");
        return;
    } else if (results.length === 1) {
        log("Found face on image, assigned label >" + label + "<");
    }

    var labeledDescriptor = new faceapi.LabeledFaceDescriptors(label, [
        results[0].descriptor
    ]);

    labeledImageDescriptors.push(labeledDescriptor);
}

export async function trainFaceRecognition() {
    faceMatcher = new faceapi.FaceMatcher(labeledImageDescriptors);
}

export async function matchFace(descriptor) {
    const bestMatch = faceMatcher.findBestMatch(descriptor);
    return bestMatch;
    //console.log(bestMatch.toString());
}

export async function addImage() {
    var label = getInput("imageLabel");
    var video = document.querySelector("#webcam");
  
    var canvas = document.createElement("canvas");
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    var img = document.createElement("img");
    img.src = canvas.toDataURL();
    console.log(img.src);
  
    await addTrainingImage(img.src, label);
  }
  