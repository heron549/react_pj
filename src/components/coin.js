import { useEffect, useState } from "react";

function Coin() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null); // 선택한 코인
  const [amount, setAmount] = useState(""); // 사용자가 입력한 금액
  const [convertedValue, setConvertedValue] = useState(null); // 환산된 금액

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  // 환산 기능
  const handleConversion = () => {
    if (selectedCoin && amount) {
      const coinPrice = selectedCoin.quotes.USD.price;
      const value = amount / coinPrice; // 입력한 금액을 코인 가격으로 나눔
      setConvertedValue(value);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>코인 환율 계산기</h1>
      {loading ? (
        <div className="newtons-cradle">
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
          <div className="newtons-cradle__dot"></div>
        </div>
      ) : (
        <div>
          <select
            onChange={(e) => {
              const selectedId = e.target.value;
              const coin = coins.find((coin) => coin.id === selectedId);
              setSelectedCoin(coin);
              setConvertedValue(null); // 코인을 변경할 때마다 환산 값 초기화
            }}
          >
            <option value="">코인을 선택하세요</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}) - ${coin.quotes.USD.price.toFixed(2)}
              </option>
            ))}
          </select>

          {selectedCoin && (
            <div>
              <h3>
                선택한 코인: {selectedCoin.name} ({selectedCoin.symbol})
              </h3>
              <p>현재 가격: ${selectedCoin.quotes.USD.price.toFixed(2)}</p>

              <input
                type="number"
                placeholder="금액을 입력하세요 (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <button onClick={handleConversion}>계산하기</button>

              {convertedValue !== null && (
                <div>
                  <h4>환산 결과</h4>
                  <p>
                    {amount} USD = {convertedValue.toFixed(6)}{" "}
                    {selectedCoin.symbol}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Coin;
