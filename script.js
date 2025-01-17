const routes = {
    "/": displayHomePage,
    "/products": displayProductsPage,
    "/product/:id": displayProductDetailsPage,
    "/cart": displayShoppingCartPage,
    "/checkout": displayCheckoutPage,
    "/login": displayLoginPage,
    "/register": displayRegisterPage,
     "/profile": displayProfilePage,
};

 // Fake cart and user data. No persistence!
let cart = [];
let user = null;

  function showNotification(message, duration = 3000){
      const notificationArea = document.getElementById("notification-area");
      notificationArea.textContent = message;
      notificationArea.classList.add('active');

      setTimeout(() => {
        notificationArea.classList.remove('active');
      }, duration);

  }
// Generic function to handle page loading (for demo, NO actual AJAX)
function loadPage() {
    const path = window.location.pathname;
    let matchedRoute = routes[path]; // Get the function directly

    if (!matchedRoute){
        // Check for dynamic route for products
        if(path.startsWith("/product/")){
            const id = path.split("/")[2]; // Get product id from url
            matchedRoute = () => displayProductDetailsPage(id); // Function will call display with id
        }
    }

    if(matchedRoute) {
        const contentArea = document.getElementById('content-area');
        if(contentArea) {
             contentArea.innerHTML = "";
            matchedRoute();
            // Call the function to add animation to page
            addAnimationToPage();
        }
    } else {
         document.getElementById("content-area").innerHTML = `
         <h1>404 Not Found</h1>
         <p>The page you requested was not found.</p>
         `;
    }
}

function changePage(path){
  window.history.pushState({},'', path);
  loadPage();
}
function addAnimationToPage(){
   const heroSection = document.querySelector('.hero-section');
     heroSection.classList.add('active');

   const trendingSection = document.querySelector('.trending-section');
   trendingSection.classList.add('active');

   const trendingItems = document.querySelectorAll('.trending-section .trending-item');
   trendingItems.forEach((item, index) => {
    setTimeout(()=> {
       item.classList.add('active')
    }, index * 200);
   });


      const classicsSpotlight = document.querySelector('.classics-spotlight');
     classicsSpotlight.classList.add('active');

  const dontMiss = document.querySelector('.dont-miss');
     dontMiss.classList.add('active');

    const shopBySport = document.querySelector('.shop-by-sport');
    shopBySport.classList.add('active');


    const memberBenefits = document.querySelector('.member-benefits');
    memberBenefits.classList.add('active');

   const memberItems = document.querySelectorAll('.member-benefits .member-item');
   memberItems.forEach((item, index) => {
     setTimeout(()=> {
       item.classList.add('active')
   }, index * 200);
    });

    const footer = document.querySelector('footer');
     footer.classList.add('active');

 }
// Add event listeners to navigation links to trigger dynamic route changes

document.getElementById('home-link').addEventListener('click', (event) => {
    event.preventDefault();
     changePage("/");
});

document.getElementById('products-link').addEventListener('click', (event) => {
    event.preventDefault();
    changePage("/products");
});
document.getElementById('cart-link').addEventListener('click', (event) => {
    event.preventDefault();
    changePage("/cart");
});

  document.getElementById('profile-link').addEventListener('click', (event) => {
      event.preventDefault();
      if(user){
        changePage("/profile");
      } else {
           changePage('/login')
      }
});

document.getElementById('login-link').addEventListener('click', (event) => {
    event.preventDefault();
    changePage("/login");
});


//Function to add product to the cart (no real storage)
function addToCart(productId) {
      let newProduct = {id: productId, name: 'Product ' + productId, price: Math.random() * 100 + 20, qty:1}
        let existingItem = cart.find(item => item.id === productId);
      if(existingItem){
        existingItem.qty++;
      } else {
        cart.push(newProduct)
      }
        showNotification("Added " + newProduct.name + " to cart!");
}


function removeFromCart(productId){
   cart = cart.filter(item => item.id !== productId)
   displayShoppingCartPage();
}


function updateQuantity(productId, qty){
    const product = cart.find(item => item.id == productId);
    if(product){
        product.qty = parseInt(qty, 10);
    }

    displayShoppingCartPage();
}


// Function to handle carousel movement
function moveCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    const carouselItems = carousel.querySelector(".carousel-items");
    const items = carouselItems.querySelectorAll(".carousel-item");
    const itemWidth = items[0].offsetWidth;
    const visibleItems = Math.round(carousel.offsetWidth / itemWidth);

     let currentPosition = parseInt(getComputedStyle(carouselItems).transform.split(',')[4]) || 0;
   if(direction === 'next'){
        if(currentPosition > -itemWidth * (items.length - visibleItems)){
          currentPosition -= itemWidth;
         } else {
               currentPosition = 0
         }
   } else {
    if (currentPosition < 0 ) {
        currentPosition += itemWidth;
     } else {
          currentPosition = -itemWidth * (items.length - visibleItems)
    }
}
     carouselItems.style.transform = `translateX(${currentPosition}px)`
}
// Route handlers for pages, will load HTML into the content-area
function displayHomePage() {
  document.getElementById("content-area").innerHTML = `
      <div class="hero-section">
         <img src="https://placehold.co/1200x400" alt="Hero Image"/>
         <div class="overlay-text">
           <h2>Have A Hard Year</h2>
            <p>This is text description or paragraph here.</p>
            <p class="kobe">Kobe</p>
         </div>
      </div>
       <div class="trending-section">
        <h2>Trending</h2>
           <div class="trending-items">
             <div class="trending-item">
                 <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_379,c_limit/0ebd455c-1c7e-4958-8c64-20eacc1d760d/image.png" alt="Trend 1"/>
             </div>
             <div class="trending-item">
                 <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_379,c_limit/b8dcd1ee-89c4-4ee7-8cbf-b06b4bdb2243/image.png" alt="Trend 2"/>
             </div>
            <div class="trending-item">
                  <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/h_379,c_limit/188c6b08-706f-4f90-85ca-41dc49f0824a/image.jpg" alt="Trend 3"/>
            </div>
          </div>
      </div>
       <div class="classics-spotlight">
          <h2>Classics Spotlight</h2>
           <div class="carousel" id="classics-carousel">
              <div class="carousel-items">
                   <div class="carousel-item">
                       <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1513,c_limit/6fc47a68-4b41-4b16-910b-5d506f644e31/nike-just-do-it.png">
                       <h3>Air Max DN</h3>
                   </div>
                    <div class="carousel-item">
                       <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1126,c_limit/5f8626df-c9fc-4c9a-9569-c27799f14ce8/nike-just-do-it.png">
                       <h3>Air Max 90</h3>
                   </div>
                   
                   <div class="carousel-item">
                        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1513,c_limit/59a78130-6d08-4bb7-ad13-0d4f8d03e620/nike-just-do-it.png">
                        <h3>Cortez</h3>
                    </div>
                   <div class="carousel-item">
                        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1513,c_limit/15f840ee-ecb2-4d30-af30-6ac8893947ce/nike-just-do-it.png">
                        <h3>Killshot</h3>
                    </div>
                   <div class="carousel-item">
                        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1513,c_limit/f1c1e89f-6b14-41e0-80a6-a1332bf01ccc/nike-just-do-it.png" alt="Shoe 6">
                       <h3>Pegasus 41</h3>
                   </div>
                     <div class="carousel-item">
                        <img src="https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1513,c_limit/4150ed95-006a-4e59-9fec-6503c0b1f752/nike-just-do-it.png" alt="Shoe 7">
                       <h3>Vomero</h3>
                    </div>
              </div>
               <div class="carousel-control carousel-prev" onclick="moveCarousel('classics-carousel', 'prev')">❮</div>
                <div class="carousel-control carousel-next" onclick="moveCarousel('classics-carousel', 'next')">❯</div>
         </div>
      </div>
      <div class="dont-miss">
         <img src="https://placehold.co/1200x300" alt="Don't Miss Video"/>
          <div class="overlay-text">
              <h2>Built To Be Different</h2>
               <p>Unleash your explosive game with more stability and new Air cushioning.</p>
          </div>
      </div>
       <div class="shop-by-sport">
          <h2>Shop By Sport</h2>
             <div class="sport-carousel" id="sport-carousel">
                <div class="sport-carousel-items">
                     <div class="sport-carousel-item">
                         <img src="https://placehold.co/300x200" alt="Running"/>
                          <h3>Running</h3>
                     </div>
                     <div class="sport-carousel-item">
                         <img src="https://placehold.co/300x200" alt="Football"/>
                         <h3>Football</h3>
                   </div>
                     <div class="sport-carousel-item">
                         <img src="https://placehold.co/300x200" alt="Basketball"/>
                          <h3>Basketball</h3>
                    </div>
                 </div>
                 <div class="carousel-control carousel-prev" onclick="moveCarousel('sport-carousel', 'prev')">❮</div>
                <div class="carousel-control carousel-next" onclick="moveCarousel('sport-carousel', 'next')">❯</div>
           </div>
       </div>
     <div class="member-benefits">
        <h2>Member Benefits</h2>
           <div class="member-items">
             <div class="member-item">
                 <img src="https://placehold.co/400x300" alt="Member Benefit 1"/>
                  <div class="overlay-text">
                    <h3>Member Product</h3>
                     <p>Your Exclusive Access</p>
                 </div>
             </div>
             <div class="member-item">
                 <img src="https://placehold.co/400x300" alt="Member Benefit 2"/>
                <div class="overlay-text">
                    <h3>Nike By You</h3>
                     <p>Your Customisation Service</p>
                  </div>
             </div>
            <div class="member-item">
                  <img src="https://placehold.co/400x300" alt="Member Benefit 3"/>
                   <div class="overlay-text">
                    <h3>Member Rewards</h3>
                    <p>How We Say Thank You</p>
                 </div>
            </div>
          </div>
      </div>
   <br>
     <h2>Our Products</h2>
    <div class="products">
        <div class="product-card">
          <img src="https://placehold.co/300x200/007bff/ffffff" alt="Shoe 1">
          <h3>Running Shoe</h3>
          <p>$100.00</p>
          <button onclick="addToCart(1)">Add to Cart</button>
          <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer" onclick="changePage('/product/1')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/28a745/ffffff" alt="Shoe 2">
          <h3>Basketball Shoe</h3>
          <p>$120.00</p>
           <button onclick="addToCart(2)">Add to Cart</button>
            <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/2')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/dc3545/ffffff" alt="Shoe 3">
          <h3>Training Shoe</h3>
          <p>$150.00</p>
            <button onclick="addToCart(3)">Add to Cart</button>
              <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/3')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/ffc107/ffffff" alt="Apparel 1">
          <h3>Running Shirt</h3>
          <p>$60.00</p>
            <button onclick="addToCart(4)">Add to Cart</button>
              <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/4')">View Details</a>
         </div>
          <div class="product-card">
          <img src="https://placehold.co/300x200/17a2b8/ffffff" alt="Apparel 2">
          <h3>Training Shorts</h3>
          <p>$40.00</p>
            <button onclick="addToCart(5)">Add to Cart</button>
              <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/5')">View Details</a>
         </div>

    </div>
  `;
}

function displayProductsPage() {
   document.getElementById("content-area").innerHTML = `
    <h2>Our Products</h2>
    <div class="products">
        <div class="product-card">
          <img src="https://placehold.co/300x200/007bff/ffffff" alt="Shoe 1">
          <h3>Running Shoe</h3>
          <p>$100.00</p>
          <button onclick="addToCart(1)">Add to Cart</button>
           <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer" onclick="changePage('/product/1')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/28a745/ffffff" alt="Shoe 2">
          <h3>Basketball Shoe</h3>
          <p>$120.00</p>
           <button onclick="addToCart(2)">Add to Cart</button>
           <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/2')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/dc3545/ffffff" alt="Shoe 3">
          <h3>Training Shoe</h3>
          <p>$150.00</p>
            <button onclick="addToCart(3)">Add to Cart</button>
            <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/3')">View Details</a>
        </div>
        <div class="product-card">
          <img src="https://placehold.co/300x200/ffc107/ffffff" alt="Apparel 1">
          <h3>Running Shirt</h3>
          <p>$60.00</p>
            <button onclick="addToCart(4)">Add to Cart</button>
              <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/4')">View Details</a>
         </div>
          <div class="product-card">
          <img src="https://placehold.co/300x200/17a2b8/ffffff" alt="Apparel 2">
          <h3>Training Shorts</h3>
          <p>$40.00</p>
            <button onclick="addToCart(5)">Add to Cart</button>
              <a style="display:block; text-decoration: underline; margin-top: 5px; cursor:pointer"  onclick="changePage('/product/5')">View Details</a>
         </div>

    </div>
  `;
}

function displayProductDetailsPage(productId) {
   document.getElementById("content-area").innerHTML = `
    <div class="product-details">
        <h2>Product Details</h2>
         <img src="https://placehold.co/400x300" alt="Product Image">
        <h2>Product ${productId}</h2>
        <p>This is the detailed description of product with ID ${productId}.  This can include sizes, materials etc. For demo purposes, just a placeholder.</p>
         <p><b>Price: $${(Math.random() * 100 + 20).toFixed(2)}</b></p>
        <button onclick="addToCart(${productId})">Add to Cart</button>
        <br><br><button onclick="changePage('/products')">Back to Products</button>
    </div>
  `;
}

function displayShoppingCartPage() {
      let cartItemsHtml = "";
    let total = 0;
    let subtotal = 0;

       if (cart.length > 0) {
        cart.forEach(item => {
          const itemSubtotal = item.price * item.qty;
          subtotal += itemSubtotal;
          cartItemsHtml += `
            <li>
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <input type="number" value="${item.qty}" min="1" onchange="updateQuantity(${item.id}, this.value)"/>
                <span>Subtotal: $${itemSubtotal.toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </li>
        `;
    });
          total = subtotal;

       } else {
       cartItemsHtml = "<p>Your cart is empty.</p>";
    }
 document.getElementById("content-area").innerHTML = `
   <div class="cart-page">
         <h2>Bag</h2>
        <div class="cart-section">
                <div class="cart-items-container">
                <ul class="cart-items">
                   ${cartItemsHtml}
                </ul>
                </div>
                   <div class="cart-summary-container">
                     <h2>Summary</h2>
                           <p><span>Subtotal</span> <span>$${subtotal.toFixed(2)}</span></p>
                            <p><span>Estimated Delivery & Handling</span> <span>Free</span></p>
                                <p class="total"><span>Total</span> <span>$${total.toFixed(2)}</span></p>
                            <button onclick="changePage('/checkout')" style="cursor:pointer">Guest Checkout</button>
                             <button onclick="changePage('/checkout')" style="cursor:pointer">Member Checkout</button>
                   </div>

        </div>
             <div class="you-might-like">
                   <h2>You Might Also Like</h2>
                  <div class="carousel" id="cart-carousel">
              <div class="carousel-items">
                   <div class="carousel-item">
                       <img src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/0dc2c0a2-85c1-471c-81a2-989766ba6e8a/jr-mercurial-vapor-16-club-younger-mg-low-top-football-boot-mGVFqZ.png" alt="Shoe 1">
                       <h3>Nike Jr. Mercurial Vapor 16 Club</h3>
                    <p>Younger Kids' MG Low-Top Football Boot</p>
                    <p><b>MRP : ₹ 3 695.00</b></p>
                   </div>
                    <div class="carousel-item">
                       <img src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/e92945de-c78c-4396-b102-336823037021/run-swift-3-road-running-shoes-BrHm16.png" alt="Shoe 2">
                        <h3>Nike Run Swift 3</h3>
                         <p>Men's Road Running Shoes</p>
                     <p><b> ₹ 5 977.00 <br> MRP :  ₹ 6 295.00</b></p>
                   </div>
                   <div class="carousel-item">
                        <img src="https://static.nike.com/a/images/t_PDP_864_v1,f_auto,q_auto:eco/7eca899b-f236-4415-bd72-87e93ba188cf/dunk-low-retro-shoes-bCzchX.png" alt="Shoe 3">
                       <h3>Nike Dunk Low Retro</h3>
                        <p>Men's Shoes</p>
                         <p><b>MRP : ₹ 8 695.00</b></p>
                    </div>
             </div>
               <div class="carousel-control carousel-prev" onclick="moveCarousel('cart-carousel', 'prev')">❮</div>
                <div class="carousel-control carousel-next" onclick="moveCarousel('cart-carousel', 'next')">❯</div>
         </div>
              </div>
      <br><br><button onclick="changePage('/products')">Continue Shopping</button>
  </div>
`;
}

  function displayProfilePage(){
       if(user){
            document.getElementById("content-area").innerHTML = `
                 <h2>User Profile</h2>
                 <p><b>Username:</b> ${user.username}</p>
                   <p><b>Email:</b> ${user.email || 'Not provided'}</p>
                   <br><button onclick="changePage('/')">Back To Home</button>
                 `;
        } else {
              document.getElementById("content-area").innerHTML = `
                   <h2>Not logged in</h2>
                  <button onclick="changePage('/login')">Login</button>
                  `
        }
  }

function displayCheckoutPage() {
   document.getElementById("content-area").innerHTML = `
    <h2>Checkout</h2>
    <form id="checkout-form">
       <div class="form-group">
         <label for="name">Name:</label>
        <input type="text" id="name" required>
       </div>
       <div class="form-group">
         <label for="email">Email:</label>
         <input type="email" id="email" required>
       </div>
       <div class="form-group">
         <label for="address">Address:</label>
        <textarea id="address" required></textarea>
      </div>
        <button onclick="submitCheckout()">Place Order</button>
    </form>
      <br><br><button onclick="changePage('/cart')">Back to Cart</button>
  `;
}

 function displayLoginPage() {
    document.getElementById("content-area").innerHTML = `
     <div class="auth-page">
         <form id="login-form">
          <h2>Login</h2>
          <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" required>
                 <span id="username-error" class="error-message"></span>
          </div>
            <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <span id="password-error" class="error-message"></span>
            </div>
            <button type="button" onclick="submitLogin()">Login</button>
               <p>Not a member ? <a onclick="changePage('/register')" style="text-decoration: underline;cursor:pointer;">Register</a></p>
        </form>
       </div>
    `;
}

 function displayRegisterPage() {
    document.getElementById("content-area").innerHTML = `
         <div class="auth-page">
              <form id="register-form">
               <h2>Register</h2>
                <div class="form-group">
                   <label for="new-username">Username:</label>
                    <input type="text" id="new-username" required>
                   <span id="new-username-error" class="error-message"></span>
                   </div>
                    <div class="form-group">
                    <label for="new-password">Password:</label>
                     <input type="password" id="new-password" required>
                   <span id="new-password-error" class="error-message"></span>
                </div>
               <div class="form-group">
               <label for="email">Email:</label>
                <input type="email" id="email" required>
               <span id="email-error" class="error-message"></span>
                </div>
                    <button type="button" onclick="submitRegister()">Register</button>
                 <p>Already a member ? <a onclick="changePage('/login')" style="text-decoration: underline;cursor:pointer;">Login</a></p>
           </form>
        </div>
    `;
}


// Simulated form submissions
function submitCheckout(){
const name = document.getElementById('name').value;
const email = document.getElementById('email').value;
const address = document.getElementById('address').value;

 showNotification(`Checkout Completed!`);
cart = [];
changePage('/')
}


function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const usernameError = document.getElementById("username-error");
    const passwordError = document.getElementById("password-error");

    if(username === "test" && password === "test"){
        user = {username};
        showNotification("Login Successful!");
        changePage('/');
    } else {
         usernameError.textContent = "Invalid credentials!";
         passwordError.textContent = "Invalid credentials!";
    }


}

function submitRegister() {
     const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
     const email = document.getElementById('email').value;
   const usernameError = document.getElementById("new-username-error");
    const passwordError = document.getElementById("new-password-error");
    const emailError = document.getElementById("email-error");

   if(newUsername == "test" && newPassword == "test"){
       user = {username: newUsername, email};
       showNotification("Registration Successful!");
       changePage('/');
     } else {
        usernameError.textContent = "Invalid credentials!";
        passwordError.textContent = "Invalid credentials!";
        emailError.textContent = "Invalid credentials!"
    }

}

// Initial page load
window.addEventListener('load', () => loadPage());
window.addEventListener("popstate", loadPage);