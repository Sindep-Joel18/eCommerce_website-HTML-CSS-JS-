const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];


document.addEventListener('DOMContentLoaded', function() {

    function toggleMenu() {
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburgerMenu.addEventListener('click', function() {
        toggleMenu();
    });

    closeMenu.addEventListener('click', function() {
        toggleMenu();
    });

    document.addEventListener('click', function(event) {
        if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    function renderCartItems() {
        const cartItemsTableBody = document.querySelector('#cart-items tbody');
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;

        cartItemsTableBody.innerHTML = '';

        cartItems.forEach((item, index) => {
            const row = document.createElement('tr');
            const itemSubtotal = item.price * item.quantity; 

            // <--<td><a href="product.html?id=${item.id}">${item.title}</a></td>-->
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
                <td>${item.title}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td> 
                <td>$${itemSubtotal.toFixed(2)}</td> 
                <td><button class="remove-button" data-index="${index}">Remove</button></td>
            `;

            cartItemsTableBody.appendChild(row);
            subtotal += itemSubtotal;
        });

        document.getElementById('cart-subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('cart-total').textContent = subtotal.toFixed(2);
    }

    function removeFromCart(index) {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1); 
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    }

    document.querySelector('#cart-items').addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-button')) {
            const index = event.target.getAttribute('data-index');
            removeFromCart(index);
        }
    });

    renderCartItems();
});

const exploreButton = document.getElementById('contact-button');
exploreButton.addEventListener('click', function() {
    window.location.href = '../pages/contact.html';
});


document.addEventListener('DOMContentLoaded', function() {
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchOverlay = document.getElementById('close-search-overlay');

    searchIcon.addEventListener('click', function() {
        searchOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
        // searchInput.focus();
    });

    closeSearchOverlay.addEventListener('click', function() {
        searchOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    });

    searchOverlay.addEventListener('click', function(event) {
        if (event.target === searchOverlay) {
            searchOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const placeOrderButton = document.querySelector('.btn1');
    const paymentIcons = document.querySelectorAll('.payment-icons i');
    let selectedPaymentMethod = null;

    paymentIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            paymentIcons.forEach(icon => icon.classList.remove('selected'));
            this.classList.add('selected');
            selectedPaymentMethod = this.getAttribute('data-value');
        });
    });

    placeOrderButton.addEventListener('click', function() {
        const billingForm = document.getElementById('billing-form');
        const shippingForm = document.getElementById('shipping-form');

        let errorMessages = [];

        if (!billingForm.checkValidity()) {
            errorMessages.push('Please fill out all required billing fields.');
        }

        if (!shippingForm.checkValidity()) {
            errorMessages.push('Please fill out all required shipping fields.');
        }

        if (!selectedPaymentMethod) {
            errorMessages.push('Please select a payment method.');
        }

        if (errorMessages.length > 0) {
            showFailureOverlay(errorMessages.join(' '));
            return;
        }

        const orderDetails = {
            items: JSON.parse(localStorage.getItem('cart')) || [],
            total: parseFloat(document.getElementById('cart-total').textContent)
        };

        setTimeout(() => {
            showSuccessOverlay();
            localStorage.removeItem('cart');
        }, 3000);
    });

    function showSuccessOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'overlay success-overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                 <button id="close-success-overlay" class="close-button">&times;</button>
                <h2>Order Placed Successfully!</h2>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('close-success-overlay').addEventListener('click', function() {
            document.body.removeChild(overlay);
            window.location.href = '../pages/shop.html';
        });

        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                document.body.removeChild(overlay);
                localStorage.removeItem('cart');
                window.location.href = '../pages/shop.html';
            }
        });
    }

    function showFailureOverlay(message) {
        const overlay = document.createElement('div');
        overlay.className = 'overlay failure-overlay';
        overlay.innerHTML = `
            <div class="overlay-content">
                <button id="close-failure-overlay" class="close-button">&times;</button>
                <h2>${message}</h2>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById('close-failure-overlay').addEventListener('click', function() {
            document.body.removeChild(overlay);
        });

        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }
});
