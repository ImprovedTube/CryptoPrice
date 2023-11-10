

export function setSelectedCryptosInStorage(selectedCryptos) {
    console.log("Storing selected cryptos: ", selectedCryptos);

    storeChoosenCurrencies(selectedCryptos);
}

export function getCryptosFromStorage() {
    return getStoredCurrencies().then((datas) => {
        return datas;
    });
}

function storeChoosenCurrencies(currencies) {
    chrome.storage.sync.set({ key: currencies }, function () {
        // console.log("Value is set");
    });
}


function getStoredCurrencies() {
    return new Promise((resolve) => {
        chrome.storage.sync.get(["key"], (result) => {
            resolve(result.key);
        });
    });
}
