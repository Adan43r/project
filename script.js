// Transaction History Array to Store the Transactions
let transactionHistory = JSON.parse(localStorage.getItem('transactionHistory')) || [];

// Limit history to the last 3 transactions
const MAX_TRANSACTIONS = 3;

// Function to handle form submission
document.getElementById("transactionForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const paymentMethod = document.getElementById("paymentMethod").value;
    const upiId = document.getElementById("upiId").value;
    const cryptoWallet = document.getElementById("cryptoWallet").value;
    const amount = document.getElementById("amount").value;
    const cryptoType = document.getElementById("cryptoType").value;

    // Basic input validation
    if (paymentMethod === "upi" && !upiId) {
        alert("Please enter UPI ID.");
        return;
    }

    if (paymentMethod === "crypto" && !cryptoWallet) {
        alert("Please enter Crypto Wallet Address.");
        return;
    }

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Generate a random transaction ID
    const transactionId = "TXN" + Math.floor(Math.random() * 1000000);

    // Simulate transaction processing
    const transaction = {
        id: transactionId,
        method: paymentMethod === "upi" ? "UPI" : `Crypto (${cryptoType})`,
        amount: amount,
        status: "Completed"
    };

    // Add transaction to history, ensure only the last 3 transactions are stored
    transactionHistory.push(transaction);
    if (transactionHistory.length > MAX_TRANSACTIONS) {
        transactionHistory.shift(); // Remove the oldest transaction
    }

    // Save updated transaction history to localStorage
    localStorage.setItem('transactionHistory', JSON.stringify(transactionHistory));

    // Update the UI with the transaction history
    updateTransactionHistory();

    // Clear the form
    document.getElementById("transactionForm").reset();
});

// Function to update the Transaction History Table
function updateTransactionHistory() {
    const transactionHistoryTable = document.getElementById("transactionHistory");
    transactionHistoryTable.innerHTML = "";

    transactionHistory.forEach(function(transaction) {
        const row = document.createElement("tr");

        const cellId = document.createElement("td");
        cellId.textContent = transaction.id;
        row.appendChild(cellId);

        const cellMethod = document.createElement("td");
        cellMethod.textContent = transaction.method;
        row.appendChild(cellMethod);

        const cellAmount = document.createElement("td");
        cellAmount.textContent = transaction.amount;
        row.appendChild(cellAmount);

        const cellStatus = document.createElement("td");
        cellStatus.textContent = transaction.status;
        row.appendChild(cellStatus);

        transactionHistoryTable.appendChild(row);
    });
}

// Hide/Show UPI ID or Crypto Wallet based on Payment Method selected
document.getElementById("paymentMethod").addEventListener("change", function() {
    const paymentMethod = this.value;

    if (paymentMethod === "upi") {
        document.getElementById("upiId").style.display = "block";
        document.getElementById("cryptoWallet").style.display = "none";
        document.getElementById("cryptoType").style.display = "none";
    } else if (paymentMethod === "crypto") {
        document.getElementById("upiId").style.display = "none";
        document.getElementById("cryptoWallet").style.display = "block";
        document.getElementById("cryptoType").style.display = "block";
    }
});

// Initialize: Load transactions from localStorage
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cryptoWallet").style.display = "none";
    document.getElementById("cryptoType").style.display = "none";

    // Load stored transaction history from localStorage
    updateTransactionHistory();
});
