let reponseBody=await fetch(`http://localhost:5678/api/works`);
let reponse=await reponseBody.json();

import { closeModal, genererElement, openModal , genererElementModal, supprimerElement, openModal2, closeModal2} from "./fonction.js";

//appel de la fonction genererElement

genererElement(reponse);

//creation des boutons de filtres

const boutonTous=document.createElement("button");
boutonTous.innerText="Tous";
boutonTous.setAttribute("class","btn");

const boutonObjets=document.createElement("button");
boutonObjets.innerText="Objets";
boutonObjets.setAttribute("class","btn");

const boutonAppartements=document.createElement("button");
boutonAppartements.innerText="Appartements";
boutonAppartements.setAttribute("class","btn");

const boutonHotelsRestaurants=document.createElement("button");
boutonHotelsRestaurants.innerText="Hotels & restaurants";
boutonHotelsRestaurants.setAttribute("class","btn");

const sectionFiltres=document.querySelector(".filtres");
sectionFiltres.appendChild(boutonTous);
sectionFiltres.appendChild(boutonObjets);
sectionFiltres.appendChild(boutonAppartements);
sectionFiltres.appendChild(boutonHotelsRestaurants);

// gestion des boutons filtres

    boutonObjets.addEventListener("click",function() {
    const reponseObjets=reponse.filter(function(reponse){
        return reponse.categoryId===1;
    });
    
    document.querySelector(".gallery").innerHTML="";
    genererElement(reponseObjets);
});

boutonAppartements.addEventListener("click",function() {
    const reponseAppartements=reponse.filter(function(reponse){
        return reponse.categoryId===2;
    });
    
    document.querySelector(".gallery").innerHTML="";
    genererElement(reponseAppartements);
});

boutonHotelsRestaurants.addEventListener("click",function() {
    const reponseHRest=reponse.filter(function(reponse){
        return reponse.categoryId===3;
    });
    
    document.querySelector(".gallery").innerHTML="";
    genererElement(reponseHRest);
});

boutonTous.addEventListener("click",function() {
    document.querySelector(".gallery").innerHTML="";
    genererElement(reponse);
});

  //gestion de la modale galery photo

  const modal=document.querySelector(".btn_nodal");
  modal.addEventListener("click",function() {
      openModal();
  });  

  const btnClose=document.querySelector(".btn_close");
  btnClose.addEventListener("click",function() {
    closeModal();
  });

    genererElementModal(reponse);

    supprimerElement(reponse);

    //gestion de la modale ajout photo

    const modal2=document.querySelector(".btn_ajout_photo");
    modal2.addEventListener("click",function() {
        openModal2();
    });

    const btnClose2=document.querySelector(".btn_close2");
    btnClose2.addEventListener("click",function() {
        closeModal2();
    });