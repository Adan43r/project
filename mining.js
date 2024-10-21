class Block {
    constructor(index, previousHash, data, difficulty) {
        this.index = index;
        this.timestamp = new Date().toLocaleString();
        this.data = data;
        this.previousHash = previousHash;
        this.difficulty = difficulty;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    // Function to calculate the hash using SHA-256
    async calculateHash() {
        const dataToHash = `${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(this.data)}${this.nonce}`;
        const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(dataToHash));
        return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
    }

    // Proof of work: Adjust nonce until a hash starts with enough zeros (based on difficulty)
    async mineBlock() {
        let target = Array(this.difficulty + 1).join("0"); // Set target difficulty (e.g., 4 leading zeros)
        while (true) {
            this.hash = await this.calculateHash();
            if (this.hash.substring(0, this.difficulty) === target) {
                console.log(`Block mined: ${this.hash}`);
                return;
            }
            this.nonce++;
        }
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;  // Initial mining difficulty
        this.pendingTransactions = [];
        this.miningReward = 50; // Reward for mining a block
    }

    // Create the first block
    createGenesisBlock() {
        return new Block(0, "0", "Genesis Block", this.difficulty);
    }

    // Get the latest block on the blockchain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Mine pending transactions and add a new block
    async minePendingTransactions(minerAddress) {
        const newBlock = new Block(this.chain.length, this.getLatestBlock().hash, this.pendingTransactions, this.difficulty);
        await newBlock.mineBlock();
        console.log("Block successfully mined!");
        this.chain.push(newBlock);

        // Reward miner
        this.pendingTransactions = [{ to: minerAddress, amount: this.miningReward }];
    }

    // Add a new transaction (for future blocks)
    createTransaction(transaction) {
        this.pendingTransactions.push(transaction);
    }

    // Check if the chain is valid
    async isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== await currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

// DOM Elements
const mineButton = document.getElementById("mineButton");
const blockchainOutput = document.getElementById("blockchainOutput");
const statusMessage = document.getElementById("statusMessage");
const minerAddressInput = document.getElementById("minerAddress");

// Instantiate a new blockchain
const blockchain = new Blockchain();

// Function to display blockchain data on the page
function displayBlockchain() {
    blockchainOutput.innerHTML = ''; // Clear previous output
    blockchain.chain.forEach(block => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('block');
        blockElement.innerHTML = `
            <p><strong>Block #${block.index}</strong></p>
            <p><strong>Timestamp:</strong> ${block.timestamp}</p>
            <p><strong>Data:</strong> ${JSON.stringify(block.data)}</p>
            <p><strong>Nonce:</strong> ${block.nonce}</p>
            <p><strong>Hash:</strong> ${block.hash}</p>
            <p><strong>Previous Hash:</strong> ${block.previousHash}</p>
        `;
        blockchainOutput.appendChild(blockElement);
    });
}

// Handle the mining button click
mineButton.addEventListener("click", async () => {
    const minerAddress = minerAddressInput.value;

    if (!minerAddress) {
        statusMessage.textContent = "Please enter a miner address!";
        return;
    }

    statusMessage.textContent = "Mining in progress...";

    // Simulate adding some transactions
    blockchain.createTransaction({ from: "User1", to: "User2", amount: 100 });
    blockchain.createTransaction({ from: "User2", to: "User3", amount: 50 });

    // Start mining and reward the miner
    await blockchain.minePendingTransactions(minerAddress);

    statusMessage.textContent = "Mining complete! Block added to the blockchain.";
    displayBlockchain();
});
