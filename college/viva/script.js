document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.textContent = 'Switch to Light';
  } else {
    body.classList.remove('dark-mode');
    toggleButton.textContent = 'Switch to Dark';
  }

  // Toggle theme on button click
  toggleButton.addEventListener('click', function () {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleButton.textContent = 'Switch to Light';
    } else {
      localStorage.setItem('theme', 'light');
      toggleButton.textContent = 'Switch to Dark';
    }
  });

  // Add to Cart functionality
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function attachCartListeners() {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    addToCartButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;

        const cartItem = {
          id: Date.now(),
          name: productName,
          price: productPrice
        };

        cart.push(cartItem);
        localStorage.setItem('cart', JSON.stringify(cart));

        // Visual feedback
        const originalText = button.textContent;
        button.textContent = 'Added!';
        button.style.background = '#28a745';

        setTimeout(() => {
          button.textContent = originalText;
          button.style.background = '#007BFF';
        }, 1500);

        console.log('Cart updated:', cart);
      });
    });
  }

  // Category filter functionality
  const categoryFilters = document.querySelectorAll('.category-filter');
  const productCards = document.querySelectorAll('.product-card');

  categoryFilters.forEach(filter => {
    filter.addEventListener('click', function () {
      const selectedCategory = this.getAttribute('data-category');

      // Update active state
      categoryFilters.forEach(f => f.classList.remove('active'));
      this.classList.add('active');

      // Filter products
      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'block';
          setTimeout(() => card.classList.add('show'), 10);
        } else {
          card.classList.remove('show');
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  // Set "All Products" as active by default
  document.querySelector('.category-filter[data-category="all"]').classList.add('active');

  // Attach cart listeners to initial buttons
  attachCartListeners();
});