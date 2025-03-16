document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', function() {
        const category = this.dataset.category;
        // Logic to filter services based on category
        console.log('Filtering services by category:', category);
    });
});

const paymentButtons = document.querySelectorAll('.payment-button');
paymentButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Logic to handle payment
        alert('Payment process initiated for ' + this.closest('.service-card').querySelector('h3').innerText);
    });
});