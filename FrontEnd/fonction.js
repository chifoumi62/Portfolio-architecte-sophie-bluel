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
    const nodal=document.querySelector(".projet");
    nodal.innerHTML=`<button class=btn_nodal>projets</button>`

    const logout=document.querySelector(".identification");
    logout.innerHTML="";
    logout.innerHTML=`<a href="login.html">logout</a>`;  
    
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

        ficheModal.appendChild(iconeElement);

        document.querySelector(".modal_body").appendChild(ficheModal);
        
    }
}

export async function supprimerElement () {
    

    const corbeille=document.querySelectorAll(".corbeille");
    for (let i = 0; i < corbeille.length; i++) {

        corbeille[i].addEventListener("click",async function() {
            const apiKey = sessionStorage.getItem("token");
            await fetch(`http://localhost:5678/api/works/${reponse[i].id}`,{
                method:"DELETE",
                headers:{
                    "accept":"*/*",
                    "Authorization":"Bearer " + apiKey
                },
                body :"null"
            });
            let reponseBodyModif=await fetch(`http://localhost:5678/api/works`);
            let reponseModif=await reponseBodyModif.json();
            
            document.querySelector(".gallery").innerHTML=" ";
            genererElement(reponseModif);
            document.querySelector(".modal_body").innerHTML=" ";
            genererElementModal(reponseModif);
            supprimerElement();
        });
    
    }
} 

/*    export function supprimerElement (reponse) {
        const corbeille=document.querySelectorAll(".corbeille");
        for (let i = 0; i < corbeille.length; i++) {

            corbeille[i].addEventListener("click",function() {
                const figure=document.querySelectorAll(".gallery figure");
                figure[i].classList.add("displayNone");
                const article=document.querySelectorAll(".modal_body article");
                article[i].classList.add("displayNone");
            });
        }
    }*/



/*export function supprimerElement (reponse) {
    const corbeille=document.querySelectorAll(".corbeille");
    for (let i = corbeille.length; i >=0; i--) {

        corbeille[i].addEventListener("click",function() {
            reponse.splice(i,1);
            document.querySelector(".gallery").innerHTML="";
            genererElement(reponse);
            document.querySelector(".modal_body").innerHTML="";
            genererElementModal(reponse);
        });
    }
}*/

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

 export function recupererElementImage(){
    const image=document.querySelector("#form_photo");
    const imageUrl=`${image.src}`
    return(imageUrl)
}

 export function recupererElementTitre(){
    const titreNew=document.querySelector("#form_titre");
    return(titreNew)
}

 export async function recupererElementCategorie(){
    let categorie=document.querySelector("#form_categorie");
    

        let reponseBody=await fetch(`http://localhost:5678/api/categories`);
        let reponse=await reponseBody.json();

        let category="null";
        
        switch (categorie) {
            case "Objets":
                category=reponse[0];
                break;
            case "Appartements":
                category=reponse[1];
                break;
            default:
                category=reponse[2];
                break;

                return(category);
        };
};


