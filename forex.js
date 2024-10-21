// Fetch live cryptocurrency data from CoinGecko API
async function fetchMarketData() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching market data:", error);
        return [];
    }
}

// Function to dynamically insert data into the table
async function populateMarketData() {
    const marketData = await fetchMarketData();
    const tableBody = document.getElementById("marketData");
    tableBody.innerHTML = ''; // Clear existing rows

    marketData.forEach(crypto => {
        const row = document.createElement("tr");

        // Create table cells
        const symbolCell = document.createElement("td");
        symbolCell.textContent = crypto.symbol.toUpperCase();

        const nameCell = document.createElement("td");
        nameCell.textContent = crypto.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${crypto.current_price.toFixed(2)}`;
        priceCell.classList.add(crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down');

        const changeCell = document.createElement("td");
        changeCell.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
        changeCell.classList.add(crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down');

        const volumeCell = document.createElement("td");
        volumeCell.textContent = `$${crypto.total_volume.toLocaleString()}`;

        // Append cells to the row
        row.appendChild(symbolCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(changeCell);
        row.appendChild(volumeCell);

        // Append row to the table body
        tableBody.appendChild(row);
    });
}

// Call the function to populate data on page load
populateMarketData();

// Optionally, refresh data every 60 seconds
setInterval(populateMarketData, 60000);
