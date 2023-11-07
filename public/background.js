
function storeChoosenCurrencies(currencies) {

    stored_data = JSON.stringify(currencies);

    chrome.storage.sync.set({ key: stored_data }, function () {
        console.log("Value is set");
    });


    // chrome.storage.sync.set({ key: value }).then(() => {
    //     console.log("Value is set");
    // });
}


function getStoredCurrencies() {
    chrome.storage.sync.get(["key"]).then((result) => {
        return result;
        // console.log("Value currently is " + result.key);
    });
}



chrome.storage.sync.get(["key"]).then((result) => {
    console.log("Value currently is " + result.key);
});