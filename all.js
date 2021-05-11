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
    window.writeLog = writeLog;
    window.clearLog = clearLog;
    window.getInput = getInput;

    // Face Recogintion
    window.face = face;

    console.log("Successfully loaded HSOS Web Helper V0.1");
}