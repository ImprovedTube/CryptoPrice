// enum Cryptocurrencies {
//     BTC = 'BTC',
//     ETH = 'ETH',
//     LTC = 'LTC',
// }

interface Cryptocurrency {
    name: string;
    ws_address: string;
    price: string;
    color: string;
}

// const CryptocurrencyMap: Map<Cryptocurrencies, Cryptocurrency> = new Map([
//     [Cryptocurrencies.BTC, { name: 'Bitcoin', ws_address: 'wss://stream.binance.com:9443/ws/btcusdt@trade', price: '0.0', color: 'gray.200' }],
//     [Cryptocurrencies.ETH, { name: 'Ethereum', ws_address: 'wss://stream.binance.com:9443/ws/ethusdt@trade', price: '0.0', color: 'gray.200' }],
//     [Cryptocurrencies.LTC, { name: 'Litecoin', ws_address: 'wss://stream.binance.com:9443/ws/ltcusdt@trade', price: '0.0', color: 'gray.200' }],
// ]);

function createCryptocurrencyFromName(name: string): Cryptocurrency {
    return {name: name, ws_address: 'wss://stream.binance.com:9443/ws/'+ name.toLowerCase() + 'usdt@trade', price: '0.0', color: 'gray.200'};
}

function createCryptocurrenciesFromNames(names: string[]): Cryptocurrency[] {
    return names.map(createCryptocurrencyFromName);
}

// function getKeyByValue<T extends string>(enumObject: Record<string, T>, value: T): string | undefined {
//     return Object.keys(enumObject).find(key => enumObject[key] === value);
// }

export default Cryptocurrency;
export { /*Cryptocurrencies, CryptocurrencyMap,*/ createCryptocurrencyFromName, createCryptocurrenciesFromNames /*getKeyByValue*/ };