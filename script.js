function calculateProfitLoss() {
    const currencyPair = document.getElementById("currencyPair").value;
    const accountCurrency = document.getElementById("accountCurrency").value;
    const volumeLots = parseFloat(document.getElementById("volumeLots").value);
    const tradeDirection = document.getElementById("tradeDirection").value.toLowerCase();
    const openPrice = parseFloat(document.getElementById("openPrice").value);
    const closePrice = parseFloat(document.getElementById("closePrice").value);

    // Determine pip value
    let pipValue;
    if (currencyPair.includes("JPY")) {
        pipValue = volumeLots * 0.01;
    } else {
        pipValue = volumeLots * 0.0001;
    }

    // Calculate profit or loss
    let profitLoss;
    if (tradeDirection === "buy") {
        profitLoss = (closePrice - openPrice) * pipValue;
    } else if (tradeDirection === "sell") {
        profitLoss = (openPrice - closePrice) * pipValue;
    } else {
        alert("Invalid trade direction. Choose 'Buy' or 'Sell'.");
        return;
    }

    // Convert to account currency if needed (Assume conversion rate is 1 for simplicity here)
    if (!currencyPair.includes(accountCurrency)) {
        const exchangeRate = 1;  // Replace this with actual conversion rate if needed
        profitLoss *= exchangeRate;
    }

    // Display result with "Profit" or "Loss"
    const resultElement = document.getElementById("result");
    if (profitLoss > 0) {
        resultElement.innerHTML = `Profit: ${profitLoss.toFixed(2)} ${accountCurrency}`;
        resultElement.style.color = "green";
    } else if (profitLoss < 0) {
        resultElement.innerHTML = `Loss: ${Math.abs(profitLoss).toFixed(2)} ${accountCurrency}`;
        resultElement.style.color = "red";
    } else {
        resultElement.innerHTML = `No Profit or Loss`;
        resultElement.style.color = "black";
    }
}
