// Simulating a blockchain in an array
let blockchain = [];

// Function to create a new transaction
function createTransaction(sender, receiver, amount) {
  const transaction = {
    sender,
    receiver,
    amount,
    timestamp: new Date().toLocaleString()
  };

  blockchain.push(transaction);
  displayBlockchain();
}

// Function to display the blockchain (transaction history)
function displayBlockchain() {
  const blockchainList = document.getElementById('blockchainList');
  blockchainList.innerHTML = '';

  blockchain.forEach((block, index) => {
    const blockElement = document.createElement('li');
    blockElement.innerHTML = `
      <strong>Transaction #${index + 1}</strong><br>
      <strong>Sender:</strong> ${block.sender}<br>
      <strong>Receiver:</strong> ${block.receiver}<br>
      <strong>Amount:</strong> ${block.amount}<br>
      <strong>Timestamp:</strong> ${block.timestamp}
    `;
    blockchainList.appendChild(blockElement);
  });
}

// Handling form submission
document.getElementById('transactionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const sender = document.getElementById('sender').value;
  const receiver = document.getElementById('receiver').value;
  const amount = document.getElementById('amount').value;

  createTransaction(sender, receiver, amount);

  // Clear form fields
  document.getElementById('sender').value = '';
  document.getElementById('receiver').value = '';
  document.getElementById('amount').value = '';
});
