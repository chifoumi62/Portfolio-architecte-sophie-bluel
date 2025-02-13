//modification de la page index
import {modifIndex} from "./fonction.js";

//gestion du formumaire de connexion

const btnConnect=document.querySelector("form");
btnConnect.addEventListener("submit", (Event)=>{
    Event.preventDefault();
    let Email=document.querySelector("#mail").value;
    let Password=document.querySelector("#password").value;
    
    console.log(Email);
    console.log(Password);
    
    fetch("http://localhost:5678/api/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email:Email,
            password:Password
        })
    })
    .then(response=>response.json())
    .then(data=>{
        if(data.token){
            sessionStorage.setItem("token",data.token);
            window.location.href="index.html";
            modifIndex();
        }
        else{
            throw new Error("erreur dans mail ou mot de passe");
        }
    })
    .catch(error=>{
        console.error(error);
    });
}); 


