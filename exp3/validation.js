document.getElementById("form").addEventListener("submit", function(e){
 e.preventDefault();
 document.querySelectorAll("span").forEach(s=>s.textContent="");
 let ok=true;
 const nameEl=document.getElementById("name");
 const email=document.getElementById("email").value.trim();
 const password=document.getElementById("password").value;
 if(nameEl){
  const name=nameEl.value.trim();
  if(name.length<3){document.getElementById("nameErr").textContent=" Name must contain at least 3 characters.";ok=false;}
 }
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){document.getElementById("emailErr").textContent=" Invalid email.";ok=false;}
 if(!/^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(password)){document.getElementById("passErr").textContent=" Minimum 6 characters with a letter and number.";ok=false;}
 if(ok){alert("Validation successful. Form can be submitted.");}
});
