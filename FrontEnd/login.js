//modification de la page index
import {modifIndex} from "./fonction.js";

//gestion du formumaire de connexion

const btnConnect=document.querySelector("form");
btnConnect.addEventListener("submit", (Event)=>{
    Event.preventDefault();
    let Email=document.querySelector("#mail").value;
    let Password=document.querySelector("#password").value;
    
    if (Email!=="sophie.bluel@test.tld" || Password!=="S0phie"){
        const messageErreur= document.querySelector(".error");
        messageErreur.innerText="Erreur dans le mail ou le mot de passe";
    }
    
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
        }
        else{
            throw new Error("erreur dans mail ou mot de passe");   
        }
    })
    .catch(error=>{
        console.error(error);
    });
    
});

if(sessionStorage.getItem("token")){
    modifIndex();
};

if(sessionStorage.getItem("token")){
    const deconect=document.querySelector(".identification");
    deconect.addEventListener("click",()=>{
        sessionStorage.removeItem("token");
        window.location.href="login.html";
    });
}


