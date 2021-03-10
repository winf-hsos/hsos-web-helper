/* global tf */

// Set the log function for the Tinkerforge Device Manager
if (typeof tf !== "undefined") {
    if (typeof tf.setLogFunction !== "undefined") {
        tf.setLogFunction(log);
    }
}

export function log(text, outputId = "console") {
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