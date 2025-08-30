const slideshow = document.getElementById('slideshow');
const exploreButtons = document.querySelectorAll('.explore-button');
// const contactButtons = document.querySelectorAll('.contact-button');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');
const closeMenu = document.querySelector('.close-menu');
const images = ['./images/hero3.jpg', './images/hero1.jpg'];
let currentIndex = 0;
let newList = [];
let categoryList = [];


function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    slideshow.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${images[currentIndex]})`;
}
changeImage();
setInterval(changeImage, 3000);


function getPost (limitNumber) {
    fetch(`https://fakestoreapi.com/products?limit=${limitNumber}`)
    .then(response => response.json())
    .then ((data) =>{
        newList = data
        // console.log(data)
        addToPage();
    });
};

function addToPage () {
    let postContainer = document.getElementById('product');
    let display = "";
    newList.forEach((singlePost) => {
        display += `
                <div class="products viewProducts">
                    <div class="product--image"><img src="${singlePost.image}" alt=''></div>
                    <div class="product--details">
                        <h3 class="product--title">${singlePost.title}</h3>
                        <p class="product-category">${singlePost.category}</p>
                        <p class="cost">$ ${singlePost.price}</p>
                    </div>
                </div>
        `
    })
    postContainer.innerHTML = display;
    viewProduct();
}


function viewProduct () {
    let viewProduct = document.querySelectorAll(".viewProducts");

    viewProduct.forEach((event, index) => {
        event.addEventListener("click", () => {
            const productId = newList[index].id;
            localStorage.setItem("productId", productId);
            window.location.href = './pages/product.html';
        });
    });
}

getPost(8)

function getCategories () {
    fetch('https://fakestoreapi.com/products/categories')
    .then(response => response.json())
    .then ((data) => {
        categoryList = data 
        // console.log(data)
        addToCategory();
    })
}

function addToCategory () {
    let displayCategory = "";
    let categoryContainer = document.getElementById('category')
    categoryList.forEach((everyCategory, index) => {
        displayCategory += `
                <div class="category--picture"></div>
                <a href="./pages/shop.html"><div class="category--name">${everyCategory}</div></a>
        `
    })

    categoryContainer.innerHTML = displayCategory
}
getCategories()

document.addEventListener('DOMContentLoaded', function() {
    exploreButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            window.location.href = './pages/shop.html';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const exploreButton = document.getElementById('contact-button');
    exploreButton.addEventListener('click', function() {
        window.location.href = './pages/contact.html';
    });
});


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


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = document.getElementById('cart-count');
    if (cartCount) {
        // Sum of all item quantities
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
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
                <a class="button" href="pages/cart.html">View Cart</a>
                <a class="button" href="pages/checkout.html">Checkout</a>
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
            <a href="./pages/cart.html" class="cart-item-link">
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

