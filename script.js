function generateSignal() {
    const signals = ["🟢 BUY", "🔴 SELL"];
    const trends = ["Bullish 📈", "Bearish 📉", "Sideways ➖"];

    const signal = signals[Math.floor(Math.random() * signals.length)];
    const confidence = Math.floor(Math.random() * 16) + 85; // 85–100%
    const trend = trends[Math.floor(Math.random() * trends.length)];

    document.getElementById("signal").innerHTML = signal;
    document.getElementById("confidence").innerHTML =
        "Confidence: " + confidence + "%";
}
function updateClock(){
const now=new Date();
document.getElementById("clock").innerHTML=now.toLocaleTimeString();
}

setInterval(updateClock,1000);
updateClock();
