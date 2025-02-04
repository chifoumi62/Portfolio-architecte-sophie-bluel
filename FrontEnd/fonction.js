let reponseBody=await fetch(`http://localhost:5678/api/works`);
let reponse=await reponseBody.json();

export function genererElement () {

    for (let i = 0; i < reponse.length; i++) {
        const figure=reponse[i]

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