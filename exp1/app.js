const products=[
{id:1,name:"Laptop",price:55000},{id:2,name:"Headphones",price:2500},
{id:3,name:"Keyboard",price:1200},{id:4,name:"Smart Watch",price:4000}
];

function getCart(){return JSON.parse(localStorage.getItem("cart")||"[]");}
function saveCart(c){localStorage.setItem("cart",JSON.stringify(c));}

function addToCart(id){
 const cart=getCart(); const p=products.find(x=>x.id===id);
 cart.push(p); saveCart(cart); alert(p.name+" added to cart");
}

const productsDiv=document.getElementById("products");
if(productsDiv){
 productsDiv.innerHTML=products.map(p=>`<div class="card">
 <h3>${p.name}</h3><p>₹${p.price}</p>
 <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button></div>`).join("");
}

const cartDiv=document.getElementById("cart");
if(cartDiv){
 const cart=getCart(); let total=0;
 cartDiv.innerHTML=cart.length?cart.map((p,i)=>{total+=p.price;
 return `<div class="cart-item"><span>${i+1}. ${p.name}</span><strong>₹${p.price}</strong></div>`}).join("")
 :"<p>Cart is empty.</p>";
 cartDiv.innerHTML+=`<h2>Total: ₹${total}</h2>`;
}

const rf=document.getElementById("registerForm");
if(rf)rf.addEventListener("submit",e=>{
 e.preventDefault();
 localStorage.setItem("user",JSON.stringify({name:regName.value,email:regEmail.value,password:regPassword.value}));
 regMsg.textContent="Registration successful.";
});
const lf=document.getElementById("loginForm");
if(lf)lf.addEventListener("submit",e=>{
 e.preventDefault(); const u=JSON.parse(localStorage.getItem("user")||"null");
 loginMsg.textContent=(u&&u.email===loginEmail.value&&u.password===loginPassword.value)
 ?"Login successful.":"Invalid email or password.";
});
