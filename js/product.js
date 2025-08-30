const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');


function retrieveProduct() {
    let productId = localStorage.getItem('productId');
    
    if (!productId) {
        console.error('No product ID found in local storage.');
        return;
    }

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Product not found');
            }
            return response.json();
        })
        .then(data => {
            let appendProduct = document.getElementById('product');
            let productDetails = '';

            productDetails += `
                <div class="product-content">
                    <div class="product-image"><img src="${data.image}" alt=''></div>
                    <div class="product-details">
                        <h1 id="product-title">${data.title}</h1>
                        <p id="product-description">${data.description}</p>
                        <p class="product-price" id="product-price">$${data.price}</p>
                        <p class="product-category" id="product-category">${data.category}</p>
                        <button id="add-to-cart" class="btn">Add to Cart</button>
                    </div>
                </div>
            `;
            appendProduct.innerHTML = productDetails;
            document.getElementById('add-to-cart').addEventListener('click', function() {
                addToCart(data);
            });
        })
        .catch(error => {
            console.error('Error fetching product:', error);
        });
}

retrieveProduct();

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}
updateCartCount();

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
    const exploreButton = document.getElementById('contact-button');
    exploreButton.addEventListener('click', function() {
        window.location.href = '../pages/contact.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const openButton = document.getElementById('open--cart');
    const overlay = document.getElementById('overlay');

    const overlayContent = `
        <div class="overlay-content">
            <div class="overlay-top">
                <p>Shopping Cart</p>
                <button id="close-overlay" class="close-button">&times;</button>
            </div>
            <div id="cart-items"></div>
            <div class="buttons">
                <a class="button" href="../pages/cart.html">View Cart</a>
                <a class="button" href="../pages/checkout.html">Checkout</a>
            </div>
        </div>
    `;

    overlay.innerHTML = overlayContent;

    function renderCartItems() {
        const cartItemsDiv = document.getElementById('cart-items');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartItemsHTML = '';

        cart.forEach(item => {
            cartItemsHTML += `
            <a href="../pages/cart.html" class="cart-item-link">
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px;">
                    <p>${item.title}</p>
                    <p>$${item.price}</p>
                </div>
            </a>
            `;
        });

        cartItemsDiv.innerHTML = cartItemsHTML;
    }

    openButton.addEventListener('click', function() {
        renderCartItems();
        overlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
    });

    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    });

    overlay.addEventListener('click', function(event) {
        if (event.target.id === 'close-overlay') {
            overlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
            document.documentElement.classList.remove('no-scroll');
        }
    });
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