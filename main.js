let svgElement = document.querySelectorAll('.char'); /* Titulo del logo */
let modObscure = document.getElementById('modObscure');
let menu = document.getElementById('check');
let cartMenu = document.getElementById('cartMenu');
let modal = document.getElementById('modal');
let platos = document.getElementById('menu');
let notItemImg = document.querySelector('.notItemImg');
/* Elementos del modo Obsucro */
let nav = document.getElementById('navi');
let svgLogo = document.getElementById('styleSvg');
let modObsureImge = document.getElementById('modObsureImge');
let listItems = document.querySelectorAll('.listItems');
let introduction = document.querySelector('.introduction');
/* Obtenemos los platos */

fetch("/platos.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        jsondata.platos.forEach(element => {
            if (element.nombre != '') {
                platos.innerHTML += `
        <div>
            <img src="${element.srcImg}" alt="">
            <div>
                <p><span>$</span>${element.precio}</p>
                <p>stock: ${element.stock}<span id="stock"></span></p>
                <p>${element.nombre}</p>
                <button data-plato="${element.index}" id="addButton">+</button>
            </div>
        </div>
    `
            }
        });
    });



/* seteo localstorage */
let localStorageValues = [
    {
        'key': localStorage.getItem('cartCount'),
        'value': 'cartCount'
    },
    {
        'key': localStorage.getItem('modObscure'),
        'value': 'modObscure'
    },
    {
        'key': localStorage.getItem('listItems'),
        'value': 'listItems'
    }
]
window.addEventListener('load', () => {
    for (let i = 0; i < localStorageValues.length; i++) {
        if (!localStorageValues[i].key) {
            localStorage.setItem(localStorageValues[i].value, '0');

        };
    };
    console.log(localStorageValues[1].key);
    if (localStorageValues[1].key === '1') {
        modObscureF();
    } else if (localStorageValues[0].key != "0") {
        notItemImg.classList.add('hidden');
    };
    cartMenu.innerText = localStorage.getItem('cartCount');
});

/* Animacion logo */
function logoAnimation() {
    let iterator = 5;
    let timerId = setInterval(function () {
        svgElement[iterator].classList.toggle('off');
        iterator >= 1 ? iterator-- : iterator = 5 && clearInterval(timerId);
    }, 200)
};

setInterval(function () {
    logoAnimation();
}, (Math.random() * (8000 - 3800) + 3800));

/* Modo Oscuro */
function modObscureF() {
    nav.classList.toggle('backgroundElements');
    /* if (modObsureImge.classList.contains('modObscuremg')) {
        modObsureImge.src = "/assets/icons/sol.png"
    } else {
        modObsureImge.src = "/assets/icons/luna.png"
    } */
    modObsureImge.classList.contains('modObscuremg') ? modObsureImge.src = "/assets/icons/sol.png" : modObsureImge.src = "/assets/icons/luna.png";
    modObsureImge.classList.toggle('modObscuremg')
    svgLogo.classList.toggle('svgStyle');
    listItems.forEach(function (element) {
        element.classList.toggle('listItemsOff');
    });
    modObsureImge.classList.contains('modObscuremg') ? localStorage.setItem('modObscure', '1') : localStorage.setItem('modObscure', '0');
}

modObsureImge.addEventListener('click', modObscureF);

/* carta menú */

menu.addEventListener('click', () => {
    modal.classList.toggle('modalOn');
});

/* Añadir elementos a la cuenta */

platos.addEventListener('click', e => {
    if (e.target.id === 'addButton') {
        /* cartMenu.innerText(localStorage.getItem)*/
        fetch("/platos.json")
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                
                localStorage.setItem('cartCount', JSON.stringify(jsondata.platos[0]))
            });
    };
});