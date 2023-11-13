interface Cryptocurrency {
    name: string;
    ws_address: string;
    price: string;
    color: string;
}


function createCryptocurrencyFromName(name: string): Cryptocurrency {
    return {name: name, ws_address: 'wss://stream.binance.com:9443/ws/'+ name.toLowerCase() + 'usdt@trade', price: '0.0', color: 'gray.200'};
}


export default Cryptocurrency;
export { createCryptocurrencyFromName };