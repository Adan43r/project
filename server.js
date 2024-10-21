// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Demo users and transactions storage
let users = [
    { id: 1, name: 'Alice', balance: 1000 },
    { id: 2, name: 'Bob', balance: 2000 },
];

let transactions = [];

// API endpoint to get users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// API endpoint to add a transaction
app.post('/api/transactions', (req, res) => {
    const { userId, amount, type } = req.body;
    const user = users.find(u => u.id === userId);

    if (user) {
        transactions.push({ userId, amount, type, date: new Date() });
        user.balance -= amount; // Deduct the amount for demo purposes
        res.status(201).json({ message: 'Transaction successful', transactions });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// API endpoint to get transactions
app.get('/api/transactions', (req, res) => {
    res.json(transactions);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// script.js (Updated)
const transactionTypeSelect = document.getElementById('transactionType');
const amountInput = document.getElementById('amount');
const addTransactionButton = document.getElementById('addTransaction');
const transactionList = document.getElementById('transactionList');
const transactionChart = document.getElementById('transactionChart');

let transactions = [];

// Fetch demo users on page load
async function fetchUsers() {
    const response = await fetch('http://localhost:5000/api/users');
    return await response.json();
}

// Fetch transactions
async function fetchTransactions() {
    const response = await fetch('http://localhost:5000/api/transactions');
    transactions = await response.json();
    updateTransactionList();
}

// Update the transaction list in the UI
function updateTransactionList() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction) => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction-item');
        transactionItem.textContent = `${transaction.type}: $${transaction.amount.toFixed(2)} on ${new Date(transaction.date).toLocaleString()}`;
        transactionList.appendChild(transactionItem);
    });
}

// Function to Add Transaction
async function addTransaction() {
    const transactionType = transactionTypeSelect.value;
    const amount = parseFloat(amountInput.value);
    
    if (!isNaN(amount) && amount > 0) {
        // Call backend to add transaction
        const response = await fetch('http://localhost:5000/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 1, amount, type: transactionType }), // Demo userId = 1
        });

        if (response.ok) {
            await fetchTransactions(); // Refresh the transaction list
            amountInput.value = '';
        } else {
            alert('Transaction failed!');
        }
    } else {
        alert('Please enter a valid amount.');
    }
}

// Event Listeners
addTransactionButton.addEventListener('click', addTransaction);

// Load users and transactions on page load
fetchUsers();
fetchTransactions();

