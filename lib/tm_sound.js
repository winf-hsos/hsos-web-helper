/* Sound classification with Teachable Machine */

var classLabels;
var recognizer;

async function loadSoundModel(url) {
    const modelURL = url + "model.json";
    const metadataURL = url + "metadata.json";

    recognizer = speechCommands.create(
        "BROWSER_FFT", // fourier transform type, not useful to change
        undefined, // speech commands vocabulary feature, not useful for your models
        modelURL,
        metadataURL
    );

    // check that model and metadata are loaded via HTTPS requests.
    await recognizer.ensureModelLoaded();

    classLabels = recognizer.wordLabels(); // get class labels

    return recognizer;
}

async function listen(callback) {
    recognizer.listen(
        result => {
            const scores = result.scores; // probability of prediction for each class

            for (let i = 0; i < classLabels.length; i++) {
                result[classLabels[i]] = result.scores[i].toFixed(2);
            }

            return callback(result);
        },
        {
            includeSpectrogram: true, // in case listen should return result.spectrogram
            probabilityThreshold: 0.75,
            invokeCallbackOnNoiseAndUnknown: true,
            overlapFactor: 0.5 // probably want between 0.5 and 0.75. More info in README
        }
    );
}
