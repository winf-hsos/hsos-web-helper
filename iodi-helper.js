import { log, clearLog, getInput } from './lib/utils.js';
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
} from './lib/face_recognition.js';

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

if (typeof window !== 'undefined') {
    window.log = log;
    window.clearLog = clearLog;
    window.getInput = getInput;

    // Face Recogintion
    window.face = face;

    console.log("Successfully loaded IODO Helper V0.1");
}