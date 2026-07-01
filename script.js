let candles = [];
function updateCandle(price) {
  let last = candles[candles.length - 1];

  // First candle
  if (!last) {
    candles.push({
      open: price,
      high: price,
      low: price,
      close: price
    });
    return;
  }

  // Update current candle
  last.close = price;

  if (price > last.high) last.high = price;
  if (price < last.low) last.low = price;
}
function generateSignal(prices, prev, curr) {

  if (prices.length < 20) return;

  let rsi = RSI(prices);
  let ema = EMA(prices);
  let live = prices[prices.length - 1];

  let trend = live > ema ? "UP" : "DOWN";

  let signal = "🟡 WAIT";
  let confidence = 50;

  // BUY
  if (rsi < 30 && trend === "UP") {
    signal = "🟢 CALL";
    confidence = 85;
  }

  // SELL
  else if (rsi > 70 && trend === "DOWN") {
    signal = "🔴 PUT";
    confidence = 85;
  }

  // PATTERN BOOST
  if (bullishEngulfing(prev, curr)) {
    signal = "🟢 CALL";
    confidence += 10;
  }

  if (bearishEngulfing(prev, curr)) {
    signal = "🔴 PUT";
    confidence += 10;
  }

  document.getElementById("signal").innerHTML = signal;
  document.getElementById("confidence").innerHTML = confidence + "%";
}
function RSI(prices, period = 14) {
  let gains = 0, losses = 0;

  if (prices.length < period + 1) return 50;

  for (let i = prices.length - period; i < prices.length; i++) {
    let diff = prices[i] - prices[i - 1];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let rs = gains / (losses || 1);
  return 100 - (100 / (1 + rs));
}
function EMA(prices, period = 10) {
  let k = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }

  return ema;
}
function bullishEngulfing(prev, curr) {
  return prev.close < prev.open &&
         curr.close > curr.open &&
         curr.close > prev.open;
}

function bearishEngulfing(prev, curr) {
  return prev.close > prev.open &&
         curr.close < curr.open &&
         curr.open > prev.close;
}
setInterval(() => {
  if (candles.length < 20) return;

  let prev = candles[candles.length - 2];
  let curr = candles[candles.length - 1];

  generateSignal(prices, prev, curr);
}, 2000);
