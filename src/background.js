

export function setSelectedCryptosInStorage(selectedCryptos) {
    console.log("Storing selected cryptos: ", selectedCryptos);

    storeChoosenCurrencies(selectedCryptos);
}

export function getCryptosFromStorage() {
    return getStoredCurrencies().then((datas) => {
        // console.log("Datas from storage: ", datas);
        return datas;
    });
}

function storeChoosenCurrencies(currencies) {

    // stored_data = JSON.stringify(currencies);

    chrome.storage.sync.set({ key: currencies }, function () {
        // console.log("Value is set");
    });

    // console.log("Stored data: ", stored_data);
}


function getStoredCurrencies() {
    // chrome.storage.sync.get(["key"]).then((result) => {
    //     console.log("Value currently is " + result.key);
    //     return result.key;
    // });

    return new Promise((resolve) => {
        chrome.storage.sync.get(["key"], (result) => {
            // console.log("Value currently is " + result.key);
            resolve(result.key);
        });
    });
}
