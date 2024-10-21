// Sample transaction data (dummy data for demonstration)
const sampleTransactions = [
    {
        consumerId: '123456',
        amount: 750,
        dueDate: '2024-09-30',
        status: 'Paid'
    },
    {
        consumerId: '789012',
        amount: 950,
        dueDate: '2024-10-05',
        status: 'Pending'
    },
    {
        consumerId: '345678',
        amount: 450,
        dueDate: '2024-10-10',
        status: 'Paid'
    }
];

document.getElementById("billForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const consumerId = document.getElementById("consumerId").value;
    const billDetailsDiv = document.getElementById("billDetails");
    const loadingIndicator = document.getElementById("loading");
    
    // Clear previous results
    billDetailsDiv.innerHTML = '';
    loadingIndicator.style.display = 'block'; // Show loading indicator

    // Simulate a delay for fetching data (like a real API call)
    setTimeout(() => {
        loadingIndicator.style.display = 'none'; // Hide loading indicator

        // Search for the transaction based on the Consumer ID
        const transaction = sampleTransactions.find(trans => trans.consumerId === consumerId);
        
        if (transaction) {
            billDetailsDiv.innerHTML = `
                <p><strong>Consumer ID:</strong> ${transaction.consumerId}</p>
                <p><strong>Bill Amount:</strong> ₹${transaction.amount}</p>
                <p><strong>Due Date:</strong> ${transaction.dueDate}</p>
                <p><strong>Status:</strong> ${transaction.status}</p>
            `;
            toastr.success('Bill details fetched successfully!');
        } else {
            billDetailsDiv.innerHTML = `<p>No data found for this Consumer ID.</p>`;
            toastr.warning('No data found for this Consumer ID.');
        }
    }, 1500); // Simulate a 1.5 seconds delay for the API call
});
