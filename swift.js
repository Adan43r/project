// Sample data arrays to mimic the API response for stocks, commodities, and crypto
const stockData = [
    { name: "Dow Jones", value: 35000, change: 0.5 },
    { name: "S&P 500", value: 4500, change: -0.3 },
    { name: "Nasdaq", value: 14000, change: 0.2 },
];

const commoditiesData = [
    { name: "Gold", value: 1800, change: -0.5 },
    { name: "Oil", value: 70, change: 0.8 },
];

const currenciesData = [
    { name: "USD/EUR", value: 0.85, change: 0.1 },
    { name: "GBP/USD", value: 1.37, change: -0.2 },
];

const cryptoData = [
    { symbol: "BTC", name: "Bitcoin", price: 27000, change: 1.5, volume: 30000000 },
    { symbol: "ETH", name: "Ethereum", price: 1800, change: -0.5, volume: 15000000 },
    { symbol: "XRP", name: "Ripple", price: 0.6, change: 0.8, volume: 5000000 },
];

// Function to populate stock market summary
function populateStockMarketSummary() {
    const stockMarketSummary = document.getElementById("stockMarketSummary");
    stockMarketSummary.innerHTML = '';

    stockData.forEach(stock => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${stock.name}</h3>
            <p>Value: ${stock.value}</p>
            <p class="${stock.change >= 0 ? 'price-up' : 'price-down'}">
                Change: ${stock.change > 0 ? '+' : ''}${stock.change}%
            </p>
        `;
        stockMarketSummary.appendChild(div);
    });
}

// Function to populate commodities and currencies summary
function populateCommoditiesCurrenciesSummary() {
    const commoditiesCurrenciesSummary = document.getElementById("commoditiesCurrenciesSummary");
    commoditiesCurrenciesSummary.innerHTML = '';

    [...commoditiesData, ...currenciesData].forEach(item => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Value: ${item.value}</p>
            <p class="${item.change >= 0 ? 'price-up' : 'price-down'}">
                Change: ${item.change > 0 ? '+' : ''}${item.change}%
            </p>
        `;
        commoditiesCurrenciesSummary.appendChild(div);
    });
}

// Function to populate cryptocurrency data in the table
function populateCryptoData() {
    const tableBody = document.getElementById("cryptoData");
    tableBody.innerHTML = '';

    cryptoData.forEach(crypto => {
        const row = document.createElement("tr");

        const symbolCell = document.createElement("td");
        symbolCell.textContent = crypto.symbol;

        const nameCell = document.createElement("td");
        nameCell.textContent = crypto.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${crypto.price.toFixed(2)}`;
        priceCell.classList.add(crypto.change >= 0 ? 'price-up' : 'price-down');

        const changeCell = document.createElement("td");
        changeCell.textContent = `${crypto.change.toFixed(2)}%`;
        changeCell.classList.add(crypto.change >= 0 ? 'price-up' : 'price-down');

        const volumeCell = document.createElement("td");
        volumeCell.textContent = `$${crypto.volume.toLocaleString()}`;

        row.appendChild(symbolCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(changeCell);
        row.appendChild(volumeCell);

        tableBody.appendChild(row);
    });
}

// Call functions to populate data on page load
populateStockMarketSummary();
populateCommoditiesCurrenciesSummary();
populateCryptoData();
