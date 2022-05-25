import { writeLog, clearLog, getInput } from './lib/utils.js';
import {
    setupCameraForFaceRecognition,
    loadFaceRecognitionModels,
    setupCanvas,
    predictFace,
    faceMatcher,
    labeledImageDescriptors,
    addTrainingImage,
    trainFaceRecognition,
    matchFace,
    addImage
} from './lib/ml/face_recognition.js';

import {
    setupWebcam,
    loop,
    loadImageModel,
    predictObjectInImage,
    startPrediction
} from './lib/ml/tm_image.js'

var face = {
    setupCameraForFaceRecognition,
    loadFaceRecognitionModels,
    setupCanvas,
    predictFace,
    faceMatcher,
    labeledImageDescriptors,
    addTrainingImage,
    trainFaceRecognition,
    matchFace,
    addImage
}

var tm = {}
tm.image = {
    setupWebcam,
    loop,
    loadImageModel,
    predictObjectInImage,
    startPrediction
}

if (typeof window !== 'undefined') {
    window.writeLog = writeLog;
    window.clearLog = clearLog;
    window.getInput = getInput;

    // Face Recogintion
    window.face = face;

    // Teachable Machine 
    window.tm = tm;

    console.log("Successfully loaded HSOS Web Helper V0.1");
}