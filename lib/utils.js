/* global tf */

// Set the writeLog function for the Tinkerforge Device Manager
if (typeof window.tf !== "undefined") {
    if (typeof window.tf.setLogFunction !== "undefined") {
        window.tf.setLogFunction(writeLog);
    }
}

export function writeLog(text, outputId = "console") {
    var output = document.querySelector("#" + outputId);

    if (text instanceof Object) {
        text = JSON.stringify(text, null, 2);
    }

    if (text !== "") {
        output.value += text + "\n";
        
        // Also print to developer console
        console.info(text);
    }
}

export function clearLog(outputId = "console") {
    var output = document.querySelector("#" + outputId);
    output.value = "";
}

export function getInput(id) {
    if (!id) {
        log("ERROR: getInput() needs the id of the input field as a parameter!")
        return "";
    }
    var input = document.querySelector("#" + id);
    return input.value;
}