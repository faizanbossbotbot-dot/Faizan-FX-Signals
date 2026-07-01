let livePrice = 0;
let prices = [];
let candles = [];

function updateCandle(price) {
  let last = candles[candles.length - 1];

  if (!last) {
    candles.push({
      open: price,
      high: price,
      low: price,
      close: price
    });
    return;
  }

  last.close = price;

  if (price > last.high) last.high = price;
  if (price < last.low) last.low = price;
}

const socket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  livePrice = parseFloat(data.p);

  prices.push(livePrice);
  if (prices.length > 100) prices.shift();

  updateCandle(livePrice);

  document.getElementById("marketPrice").innerText =
    "📈 Live Price: " + livePrice.toFixed(2);
};
