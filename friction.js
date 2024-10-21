// Array to hold blockchain transactions
let blockchainTransactions = [];

// Function to simulate a UPI transaction and transfer it to the blockchain
function createUPITransaction(sender, receiver, amount) {
  // Display the UPI transaction details
  const upiTransactionDetails = document.getElementById('upiTransactionDetails');
  const upiTransaction = document.createElement('li');
  upiTransaction.innerHTML = `
    <strong>Sender (UPI ID):</strong> ${sender}<br>
    <strong>Receiver (UPI ID):</strong> ${receiver}<br>
    <strong>Amount:</strong> ₹${amount}<br>
    <strong>Timestamp:</strong> ${new Date().toLocaleString()}
  `;
  upiTransactionDetails.appendChild(upiTransaction);

  // Simulate sending the UPI transaction to Blockchain
  transferToBlockchain(sender, receiver, amount);
}

// Function to transfer UPI transaction details to Blockchain
function transferToBlockchain(sender, receiver, amount) {
  const transaction = {
    sender,
    receiver,
    amount,
    timestamp: new Date().toLocaleString(),
    blockchainID: blockchainTransactions.length + 1, // Simulate unique block ID
  };

  blockchainTransactions.push(transaction);
  displayBlockchainTransactions();
}

// Function to display Blockchain transaction record
function displayBlockchainTransactions() {
  const blockchainList = document.getElementById('blockchainList');
  blockchainList.innerHTML = ''; // Clear the list

  blockchainTransactions.forEach((tx) => {
    const transactionElement = document.createElement('li');
    transactionElement.innerHTML = `
      <strong>Block #${tx.blockchainID}</strong><br>
      <strong>Sender (UPI ID):</strong> ${tx.sender}<br>
      <strong>Receiver (UPI ID):</strong> ${tx.receiver}<br>
      <strong>Amount:</strong> ₹${tx.amount}<br>
      <strong>Timestamp:</strong> ${tx.timestamp}
    `;
    blockchainList.appendChild(transactionElement);
  });
}

// Handling UPI form submission
document.getElementById('upiForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const sender = document.getElementById('upiSender').value;
  const receiver = document.getElementById('upiReceiver').value;
  const amount = document.getElementById('upiAmount').value;

  createUPITransaction(sender, receiver, amount);

  // Clear the form fields
  document.getElementById('upiSender').value = '';
  document.getElementById('upiReceiver').value = '';
  document.getElementById('upiAmount').value = '';
});
