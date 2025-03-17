let reponseBody=await fetch(`http://localhost:5678/api/works`);
let reponse=await reponseBody.json();

import { closeModal, genererElement,modifIndex, openModal , genererElementModal,  openModal2, closeModal2} from "./fonction.js";

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

  //modification page accueil en mode edition

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

  //gestion de la modal de suppression d'elements

  
  const modal=document.querySelector(".btn_modal");
  modal.addEventListener("click",function() {
      openModal();
  });  

  const btnClose=document.querySelector(".btn_close");
  btnClose.addEventListener("click",function() {
    closeModal();
  });

    genererElementModal(reponse);

    
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

        
        
        formPhoto.addEventListener("change", function() {
                let recupImage=formPhoto.files[0];
                let newImageUrl=URL.createObjectURL(recupImage);
        
                let newImage=document.createElement("img");
                newImage.src=newImageUrl;
                newImage.style.height="150px"
                newImage.style.width="auto";
                newImage.classList.add('js_image');
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
        btnValider.addEventListener("click",async(Event)=>{
            Event.preventDefault;
            const recupImage=formPhoto.files[0];
            const newTitre=document.querySelector ("#form_titre").value;
            const category=document.querySelector("#form_categorie").value;

            if (recupImage==="" || newTitre==="" || category===""){
                throw new Error("veuillez remplir tous les champs");
            }
            
            let formData = new FormData();
            formData.append("image", recupImage);
            formData.append("title", newTitre);
            formData.append("category", category);
        
            const apiKeys = sessionStorage.getItem("token");
            await fetch(`http://localhost:5678/api/works`,{
             method:"POST",
             headers:{
                    "Accept":"application/json",
                    "Authorization":"Bearer " + apiKeys
             },
             body: formData
         });
            document.querySelector("#form_photo").value=null;
            document.querySelector(".js_image").remove();
                label2.style.display="block";
                para.style.display="block";
                btnAjoutPhoto.style.display="block";
            document.querySelector ("#form_titre").value="";
            document.querySelector("#form_categorie").value="";

                let reponseBodyAjout=await fetch(`http://localhost:5678/api/works`);
                let reponseAjout=await reponseBodyAjout.json();
                
                document.querySelector(".gallery").innerHTML=" ";
                genererElement(reponseAjout);
                document.querySelector(".modal_body").innerHTML=" ";
                genererElementModal(reponseAjout);

                closeModal2();
                closeModal();
        });

        
