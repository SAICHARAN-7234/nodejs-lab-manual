function getCart(){return JSON.parse(localStorage.getItem("cart")||"[]");}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c));}

function addToCart(name,price){
 const cart=getCart();
 cart.push({name,price});
 saveCart(cart);
 alert(name+" added to cart");
}

// Registration
const rf=document.getElementById("registerForm");
if(rf)rf.addEventListener("submit",function(e){
 e.preventDefault();
 localStorage.setItem("user",JSON.stringify({name:document.getElementById("regName").value,email:document.getElementById("regEmail").value,password:document.getElementById("regPassword").value}));
 document.getElementById("regMsg").textContent="Registration successful.";
});

// Login
const lf=document.getElementById("loginForm");
if(lf)lf.addEventListener("submit",function(e){
 e.preventDefault();
 const u=JSON.parse(localStorage.getItem("user")||"null");
 const email=document.getElementById("loginEmail").value;
 const password=document.getElementById("loginPassword").value;
 document.getElementById("loginMsg").textContent=(u&&u.email===email&&u.password===password)?"Login successful.":"Invalid email or password.";
});

// Cart display
const cartDiv=document.getElementById("cart");
if(cartDiv){
 const cart=getCart(); let total=0;
 if(cart.length===0){
  cartDiv.innerHTML='<p class="text-muted">Cart is empty.</p>';
 }else{
  let html='<table class="table table-striped"><thead><tr><th>#</th><th>Product</th><th>Price</th></tr></thead><tbody>';
  cart.forEach(function(p,i){total+=p.price;html+='<tr><td>'+(i+1)+'</td><td>'+p.name+'</td><td>₹'+p.price+'</td></tr>';});
  html+='</tbody></table>';
  html+='<h3>Total: ₹'+total+'</h3>';
  html+='<button class="btn btn-danger" onclick="localStorage.removeItem(\'cart\');location.reload();">Clear Cart</button>';
  cartDiv.innerHTML=html;
 }
}
