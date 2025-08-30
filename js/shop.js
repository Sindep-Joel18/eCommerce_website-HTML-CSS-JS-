const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');

let productList = [];
let categories = [];

function getProductsAndCategories() {
    Promise.all([
        fetch('https://fakestoreapi.com/products').then(response => response.json()),
        fetch('https://fakestoreapi.com/products/categories').then(response => response.json())
    ])
    .then(([products, categoriesData]) => {
        productList = products;
        categories = categoriesData;
        addCategoriesToDropdown();
        addToPage();
    });
}

function addCategoriesToDropdown() {
    const categoryDropdown = document.getElementById('category-dropdown');
    let categoryHTML = '<a href="#" class="category-link" data-category="">All Categories</a>';

    categories.forEach(category => {
        categoryHTML += `<a href="#" class="category-link" data-category="${category}">${category}</a>`;
    });

    categoryDropdown.innerHTML = categoryHTML;
    addCategoryListeners();
}

function addCategoryListeners() {
    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedCategory = event.target.getAttribute('data-category');
            filterProducts(selectedCategory);
            closeCategoryDropdown();
        });
    });
}

function filterProducts(category) {
    let filteredProducts = category ? productList.filter(product => product.category === category) : productList;
    displayProducts(filteredProducts);
}

function addToPage() {
    displayProducts(productList);
}

function displayProducts(products) {
    let productContainer = document.getElementById('products');
    let display = "";
    products.forEach(singleProduct => {
        display += `
            <div class="product viewProduct" data-id="${singleProduct.id}">
                <div class="product--image"><img src="${singleProduct.image}" alt=''></div>
                <div>
                    <h4 class="product--title">${singleProduct.title}</h4>
                    <p class="product--category">${singleProduct.category}</p>
                    <p class="product--price">$${singleProduct.price.toFixed(2)}</p>
                </div>
            </div>
        `;
    });
    productContainer.innerHTML = display;
    viewProduct();
}


function viewProduct() {
    let viewProduct = document.querySelectorAll(".viewProduct");

    viewProduct.forEach(productElement => {
        productElement.addEventListener("click", () => {
            const productId = productElement.dataset.id; // Assuming you set data-id on each product element
            localStorage.setItem("productId", productId);
            window.location.href = '../pages/product.html';
        });
    });
}


document.getElementById('category-button').addEventListener('click', function() {
    const categoryDropdown = document.getElementById('category-dropdown');
    categoryDropdown.classList.toggle('show');
});

document.addEventListener('click', function(event) {
    const categoryDropdown = document.getElementById('category-dropdown');
    const categoryButton = document.getElementById('category-button');

    if (!categoryDropdown.contains(event.target) && !categoryButton.contains(event.target)) {
        closeCategoryDropdown();
    }
});

function closeCategoryDropdown() {
    const categoryDropdown = document.getElementById('category-dropdown');
    categoryDropdown.classList.remove('show');
}

getProductsAndCategories();

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

    const exploreButton = document.getElementById('contact-button');
    exploreButton.addEventListener('click', function() {
        window.location.href = '../pages/contact.html';
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let cartCount = document.getElementById('cart-count');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    updateCartCount();

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

    const searchIcon = document.querySelector('.fa-magnifying-glass');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchOverlay = document.getElementById('close-search-overlay');

    searchIcon.addEventListener('click', function() {
        searchOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
        document.documentElement.classList.add('no-scroll');
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
