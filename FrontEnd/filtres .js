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

    supprimerElement();
    
    //gestion de la modale ajout photo

    const modal2=document.querySelector(".btn_ajout_photo");
    modal2.addEventListener("click",function() {
        openModal2();
    });

    const btnClose2=document.querySelector(".btn_close2");
    btnClose2.addEventListener("click",function() {
        closeModal2();
        closeModal()
    });

    const btnRetour=document.querySelector(".btn_retour");
    btnRetour.addEventListener("click",function(){
        closeModal2()
    });

    // affichage du bouton ajout photo de la modal2

    const btnFormPhoto = document.querySelector(".btn_form_photo");
    const formPhoto = document.querySelector("#form_photo");
    const label2=document.querySelector(".container_modal2 label");
    const para=document.querySelector(".container_modal2 p");
    const btnAjoutPhoto=document.querySelector(".btn_form_photo");

        btnFormPhoto.addEventListener("click",(Event) => {
            if (formPhoto) {
            formPhoto.click();
            }
        });

        //affichage d'une photo selectionnée dans modale 2

        let newImageUrl=""
        
        formPhoto.addEventListener("change", function(newImageUrl) {
                let recupImage=formPhoto.files[0];
                newImageUrl=URL.createObjectURL(recupImage);
        
                let newImage=document.createElement("img");
                newImage.src=newImageUrl;
                newImage.style.height="150px"
                newImage.style.width="auto";
                label2.style.display="none";
                para.style.display="none";
                btnAjoutPhoto.style.display="none";

                document.querySelector(".container_modal2").appendChild(newImage);
        });

        //affichage des categories dans modal 2

        const formCategorie= document.getElementById("form_categorie");
        let reponseBodyCat=await fetch(`http://localhost:5678/api/categories`);
        let reponseCat=await reponseBodyCat.json();
        reponseCat.forEach((category) => {
            let categoryOption=document.createElement("option");
            let categorylabel=document.createElement("label");
            categoryOption.setAttribute("value",category.id);
            categorylabel.innerHTML=category.name;
            categoryOption.appendChild(categorylabel);
            formCategorie.appendChild(categoryOption);
        });


        //recuperation des données nouveau projet de la modale 2

        const btnValider=document.getElementById("btn_valider");
        btnValider.addEventListener("submit",async (Event)=>{
            Event.preventDefault;
            const newTitre=document.querySelector (".form_titre").value;
            const category=document.getElementById("form_categorie").value;
            const chargeUtile=JSON.stringify({
                "image":newImageUrl,
                "title":newTitre,
                "category":category
            });
            const apiKey = sessionStorage.getItem("token");
            await fetch(`http://localhost:5678/api/works`,{
             method:"POST",
             headers:{
                    "accept":"application/json",
                    "Authorization":"Bearer " + apiKey,
                    "content-type":"multipart/form-data"
             },
             body: chargeUtile
         });
                let reponseBodyAjout=await fetch(`http://localhost:5678/api/works`);
                let reponseAjout=await reponseBodyAjout.json();
                
                document.querySelector(".gallery").innerHTML=" ";
                genererElement(reponseAjout);
                document.querySelector(".modal_body").innerHTML=" ";
                genererElementModal(reponseAjout);

                closeModal2();
                closeModal();
        });