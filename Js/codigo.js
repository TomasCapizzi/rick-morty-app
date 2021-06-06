// Funciones Asíncronas
const API = 'https://rickandmortyapi.com/api/';
const APIPersonaje = 'https://rickandmortyapi.com/api/character/';

const APIByNombre = 'https://rickandmortyapi.com/api/character/?name='

//   Obtengo persona x ID
async function obtenerPj(pj) {
    const respuesta = await fetch(`${pj}`);
    const pjData = await respuesta.json();
    console.log(respuesta);


    mostrarPJEpisodio(pjData)
}

// Obtengo random Personajes para portada
async function personajesRandom(array) {
    const respuesta = await fetch(APIPersonaje + array);
    const personajesData = await respuesta.json();
    //personajes.push(personajesData)
    mostrarPJS(personajesData)
}

async function episodios() {
    const respuesta = await fetch(API + 'episode')
    const episodiosData = await respuesta.json();
    const totalEpisodios = episodiosData.info.count;
    console.log(totalEpisodios)
    generarOptions(totalEpisodios);
}

async function episodioInfo(nro) {
    const respuesta = await fetch(API + 'episode/' + nro)
    const episodiosData = await respuesta.json();
    const totalPersonajesXepisodio = episodiosData.characters;
    console.log(totalPersonajesXepisodio);
    pjEpisodio(totalPersonajesXepisodio)
}

async function buscarPorNombre(name) {
    const respuesta = await fetch(APIByNombre + `${name}`);
    const nombreData = await respuesta.json();
    const arrayResultados = nombreData.results
    console.log(arrayResultados)
    mostrarPJS(arrayResultados);

}


///////////////////////////////////////////////////
const cantidadPJs = 24;
const portadaPersonajes = [];
let comparacion = false;
let contenedor = document.getElementById('contenedor-pj');
const buscar = document.getElementById('btn-buscar');
const inputBusqueda = document.getElementById('buscador')
const filtrarEpisodio = document.getElementById('btn-episodio');
const personajes = [];

function generarPJSrandom(cantidad) {
    for (let i = 0; i < cantidad; i++) {
        portadaPersonajes[i] = Math.round(Math.random() * 400 + 1);
    }
    //console.log(portadaPersonajes);
    personajesRandom(portadaPersonajes)
}

function mostrarPJS(data) {
    for (let i = 0; i < data.length; i++) {
        const htmlPJ = document.createElement('div');
        htmlPJ.classList.add('pj');
        htmlPJ.innerHTML = `
        <img src=${data[i].image} alt="${data[i].name}">
        <div class='descripcion'>
            <h3>${data[i].name}</h3>
            <p>${data[i].species}</p>
        </div>
        <div class='modal'>
            <h3>${data[i].name}</h3>
            <div class='status'>
             
                <p>${data[i].status} / ${data[i].species}</p>
                
            </div>
            <div class='locacion'>
            <button><i class="fas fa-map-marker-alt"></i></button>
            <p>${data[i].location.name}</p>
            </div>
            <div>
                <p>Primera Aparición: </p>
                <p>${data[i].origin.name}</p>
            </div>
        </div>
        `
        contenedor.appendChild(htmlPJ);

    }




    const objeto = contenedor.querySelectorAll('.pj');

    objeto.forEach(modal => {

        modal.onclick = () => {
            modal.classList.toggle('on');
            const modalCss = modal.querySelector('.modal');
            if (modal.classList.contains('on')) {
                modalCss.style.display = 'block';
            } else {
                modalCss.style.display = 'none';
            }

        }
    });

}

function generarOptions(total) {
    const selectEpisodio = document.getElementById('episodio')
    for (let i = 1; i <= total; i++) {
        const episodio = document.createElement('option');
        episodio.innerText = i;
        episodio.value = i;

        selectEpisodio.appendChild(episodio)
    }
}

filtrarEpisodio.addEventListener('click', () => {
    const episodio = document.getElementById('episodio');
    contenedor.innerHTML = '';
    pjEpisodio(episodio.value);
    episodioInfo(episodio.value);
});

function pjEpisodio(data) {
    for (let i = 0; i < data.length; i++) {
        obtenerPj(data[i]);
        console.log(data[i])
    }
}

function mostrarPJEpisodio(data) {
    const htmlPJ = document.createElement('div');
    htmlPJ.classList.add('pj');
    htmlPJ.innerHTML = `
    <img src=${data.image} alt="${data.name}">
    <div class='descripcion'>
    <h3>${data.name}</h3>
    <p>${data.species}</p>
    </div>
    <div class='modal'>
    <h3>${data.name}</h3>
    <div class='status'>
        <p>${data.status}</p>
        <p>${data.species}</p>
    </div>
    <div>
        <p>Primera Aparición: </p>
        <p>${data.episode[0].name}</p>
    </div>
</div>
    `
    contenedor.appendChild(htmlPJ);


    htmlPJ.onclick = () => {
        htmlPJ.classList.toggle('on');
        const modalCss = htmlPJ.querySelector('.modal');
        if (htmlPJ.classList.contains('on')) {
            modalCss.style.display = 'block';
        } else {
            modalCss.style.display = 'none';
        }
    }


}

buscar.addEventListener('click', () => {
    const resultado = inputBusqueda.value;
    contenedor.innerHTML = '';
    buscarPorNombre(resultado);
})

function busqueda(data) {
    const htmlPJ = document.createElement('div');
    htmlPJ.classList.add('pj');
    htmlPJ.innerHTML = `
    <img src=${data.image} alt="${data.name}">
    <div class='descripcion'>
    <h3>${data.name}</h3>
    <p>${data.species}</p>
    </div>`
    contenedor.appendChild(htmlPJ);
}

episodios();
generarPJSrandom(cantidadPJs);