function generateSignal() {
    const signals = ["🟢 CALL", "🔴 PUT"];
    const strengths = ["Strong", "Very Strong", "Medium"];
    const expiries = ["30 Seconds", "1 Minute", "5 Minutes"];

    const signal = signals[Math.floor(Math.random() * signals.length)];
    const confidence = Math.floor(Math.random() * 16) + 85;
    const strength = strengths[Math.floor(Math.random() * strengths.length)];
    const expiry = expiries[Math.floor(Math.random() * expiries.length)];

    const asset = document.getElementById("pair").value;

    document.getElementById("signal").innerHTML = signal;
    document.getElementById("confidence").innerHTML = confidence + "%";
    document.getElementById("entry").innerHTML = expiry;
    document.getElementById("asset").innerHTML = asset;
    document.getElementById("strength").innerHTML = strength;

    document.getElementById("signal").style.color =
        signal.includes("CALL") ? "#00ff88" : "#ff4d4d";
}
