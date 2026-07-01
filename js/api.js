const API_KEY = "YAHAN_APNI_API_KEY_DALO";

async function getPrice(symbol = "EUR/USD") {
    try {
        const res = await fetch(
            `https://api.twelvedata.com/price?symbol=${encodeURIComponent(symbol)}&apikey=${API_KEY}`
        );

        const data = await res.json();

        if (data.price) {
            document.getElementById("marketPrice").innerHTML =
                "Live Price: " + data.price;
        }
    } catch (e) {
        console.log(e);
    }
}
