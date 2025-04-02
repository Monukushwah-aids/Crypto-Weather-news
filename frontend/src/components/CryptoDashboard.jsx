import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";

const COINS = [
  { id: "bitcoin", symbol: "BTC" },
  { id: "ethereum", symbol: "ETH" },
  { id: "dogecoin", symbol: "DOGE" }
];

export default function CryptoDashboard() {
  const [cryptoData, setCryptoData] = useState({});
  const [priceHistory, setPriceHistory] = useState({});
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState(COINS);
  const [currency, setCurrency] = useState("usd");

  useEffect(() => {
    const ws = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCryptoData((prev) => ({ ...prev, ...data }));
      setPriceHistory((prev) => {
        const updatedHistory = { ...prev };
        Object.keys(data).forEach((coin) => {
          if (!updatedHistory[coin]) {
            updatedHistory[coin] = [];
          }
          updatedHistory[coin] = [...updatedHistory[coin], { time: new Date().getTime(), price: parseFloat(data[coin]) }];
          if (updatedHistory[coin].length > 24) {
            updatedHistory[coin].shift();
          }
        });
        return updatedHistory;
      });
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    filteredCoins.forEach(async (coin) => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=1&interval=hourly`
      );
      setPriceHistory((prev) => ({ ...prev, [coin.id]: res.data.prices.map(([time, price]) => ({ time, price })) }));
    });
  }, [filteredCoins, currency]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredCoins(COINS.filter(coin => coin.symbol.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold">Largest Crypto Marketplace</h2>
        <p className="mt-2 text-gray-400">Explore the latest cryptocurrency trends and live updates</p>
        <div className="mt-6 flex justify-center">
          <input 
            type="text" 
            placeholder="Search crypto..." 
            value={search} 
            onChange={handleSearch} 
            className="p-3 w-80 bg-gray-800 text-white rounded-l-lg"
          />
          <button className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-r-lg">Search</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800">
              <th className="p-3">#</th>
              <th className="p-3">Coins</th>
              <th className="p-3">Price</th>
              <th className="p-3">24H Change</th>
              <th className="p-3">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map(({ id, symbol }, index) => (
              <tr key={id} className="border-t border-gray-700">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{symbol}</td>
                <td className="p-3">{cryptoData[id] ? `${parseFloat(cryptoData[id]).toFixed(2)} ${currency.toUpperCase()}` : "Loading..."}</td>
                <td className="p-3 text-red-400">-3.2%</td>
                <td className="p-3">$1,327,898,426,225</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {filteredCoins.map(({ id, symbol }) => (
            <div key={id} className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{symbol}</h3>
              <p className="text-lg">Price: {cryptoData[id] ? `${parseFloat(cryptoData[id]).toFixed(2)} ${currency.toUpperCase()}` : "Loading..."}</p>
              {priceHistory[id] && (
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={priceHistory[id]}>
                    <XAxis dataKey="time" tick={false} />
                    <YAxis domain={['auto', 'auto']} tick={false} />
                    <Tooltip formatter={(value) => `${value.toFixed(2)} ${currency.toUpperCase()}`} />
                    <Line type="monotone" dataKey="price" stroke="#82ca9d" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}