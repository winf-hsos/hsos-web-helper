/* IFTTT push notifications */
function sendIFTTTPushNotification(
    eventName,
    key,
    value1 = null,
    value2 = null,
    value3 = null
) {
    var url =
        "https://maker.ifttt.com/trigger/" +
        eventName +
        "/with/key/" +
        key +
        "?value1=" +
        value1 +
        "&value2=" +
        value2 +
        "&value3=" +
        value3;

    fetch(url, {
        method: "post",
        mode: "no-cors",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(response => {
        console.log(
            "IFTTT webhook called successfully. See if there were errors before."
        );
        return true;
    });
}
