let livePrice = 0;
let prices = [];

const socket = new WebSocket(
  "wss://stream.binance.com:9443/ws/btcusdt@trade"
);

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  livePrice = parseFloat(data.p);
  prices.push(livePrice);

  if (prices.length > 100) prices.shift();

  document.getElementById("marketPrice").innerText =
    "📈 Live Price: " + livePrice.toFixed(2);
};
