const reponseBody=await fetch(`http://localhost:5678/api/works`);
const reponse=await reponseBody.json();

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
    const nodal=document.querySelector(".nodal");
    nodal.innerHTML=`<a href="#">projets</a>`

    const logout=document.querySelector(".identification");
    logout.innerHTML="";
    logout.innerHTML=`<a href="login.html">logout</a>`;  
    
}


