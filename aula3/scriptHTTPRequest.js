const sectionNotes = document.querySelector('#notas');
const newNote = document.querySelector('#novaNota');

const addNotas = (notas = []) => {
    notas.forEach(nota => {
        const p = document.createElement("p");
        p.innerHTML = nota.text;
        sectionNotas.appendChild(p);
    })
}

const doRequestAjax = () => {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://fiap-notes-api.herokuapp.com/notes");
    xmlHttp.responseType = "json";
    xmlHttp.onload = () => {
        console.log(xmlHttp.response);
    }
    xmlHttp.send();
}
doRequestAjax();