    let reponseBody=await fetch(`http://localhost:5678/api/works`);
    let reponse=await reponseBody.json();


export function genererElement (reponse) {

    for (let i = 0; i < reponse.length; i++) {
        let figure=reponse[i];

        const imageElement=document.createElement("img");
        imageElement.src=figure.imageUrl;

        const titreElement=document.createElement("figcaption");
        titreElement.innerText=figure.title;

        const fiche=document.createElement("figure");

        fiche.appendChild(imageElement);
        fiche.appendChild(titreElement);

        document.querySelector(".gallery").appendChild(fiche);
 
    }
}


export function modifIndex () {
   
    const logout=document.querySelector(".identification");
    logout.innerHTML="";
    logout.innerHTML=`<a href="login.html">logout</a>`; 
    
    document.querySelector(".filtres").style.display="none";
    document.querySelector(".homepage").style.display="block";
    document.querySelector(".btn_modal").style.display="block";
    
}

export function openModal () {
    const modal=document.querySelector(".overlay");
    modal.style.display="block";
    const modal_2=document.querySelector(".modal");
    modal_2.style.display="block";
}

export function closeModal () {
    const modal=document.querySelector(".overlay");
    modal.style.display="none";
    const modal_2=document.querySelector(".modal");
    modal_2.style.display="none";
}

export  function genererElementModal (reponse) {

    for (let i = 0; i < reponse.length; i++) {
        let figure=reponse[i];

        const imageElement=document.createElement("img");
        imageElement.src=figure.imageUrl;

        const ficheModal=document.createElement("article");

        ficheModal.appendChild(imageElement);

        const iconeElement=document.createElement("button");
        iconeElement.innerHTML=`<i class="fa-solid fa-trash"></i>`;
        iconeElement.classList.add("corbeille");
        iconeElement.onclick=()=>supprimerElementById(figure.id);

        ficheModal.appendChild(iconeElement);

        document.querySelector(".modal_body").appendChild(ficheModal);
        
    }
}

 async function supprimerElementById (figureId) {
            const apiKey = sessionStorage.getItem("token");
            await fetch(`http://localhost:5678/api/works/${figureId}`,{
                method:"DELETE",
                headers:{
                    "accept":"*/*",
                    "Authorization":"Bearer " + apiKey
                },
            });
            let reponseBodyModif=await fetch(`http://localhost:5678/api/works`);
            let reponseModif=await reponseBodyModif.json();
            
            document.querySelector(".gallery").innerHTML=" ";
            genererElement(reponseModif);
            document.querySelector(".modal_body").innerHTML=" ";
            genererElementModal(reponseModif);
        };
    


export function openModal2() {
    const modal=document.querySelector(".overlay2");
    modal.style.display="block";
    const modal_2=document.querySelector(".modal2");
    modal_2.style.display="block";
}

export function closeModal2 () {
    const modal=document.querySelector(".overlay2");
    modal.style.display="none";
    const modal_2=document.querySelector(".modal2");
    modal_2.style.display="none";
}


 

 



