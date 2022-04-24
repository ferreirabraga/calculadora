const sectionNotes = document.querySelector("#notas");
const newNote = document.querySelector("#novaNota");

const addNotes = (notas = []) => {
    notas.forEach(nota => {
        const p = document.createElement("p");
        p.innerHTML = nota.text;
        sectionNotes.appendChild(p);
    });
}
const getNotes = () => {
    fetch("https://fiap-notes-api.herokuapp.com/notes")
        .then(response => response.json())
        .then(json => addNotes(json))
        .catch(err => {
            if(err.response){
                return alert("Bad request");
            }
            alert("Verifique a internet");
        });
}
const createNote = (event) => {
    event.preventDefault();
    fetch("https://fiap-notes-api.herokuapp.com/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"        },
        body: JSON.stringify({ text: newNote.value })
    })
        .then(response => response.json())
        .then(json => {
            addNotes([json]);
            event.target.reset();
        })
}
getNotes();
/** *  * Exemplos *  */ 
// let objLiterario = {a: 1, b: 2};
//  const retorno = () => "retorno qualquer";
//  const retornoDeBloco = () => {
//      return "retorno qualquer";
//  }
//  const desestruturando = () => ({response: 1234, date: new Date()});
//  const {date} = desestruturando();
//  const obj = desestruturando();
//  const outroObj = {...obj, nome: "Rafael"};