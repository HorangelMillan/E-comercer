let svgElement = document.querySelectorAll('.char'); /* Titulo del logo */
let modObscure = document.getElementById('modObscure');
let menu = document.getElementById('check');
let cartMenu = document.getElementById('cartMenu');
let modal = document.getElementById('modal');
let platos = document.getElementById('menu');
let notItemImg = document.querySelector('.notItemImg');
let itemsModal = document.getElementById('itemsModal');
let introPlatos = document.getElementById('introPlatos');
let total = document.getElementById('total');
let subTotal = document.getElementById('subTotal');
let spanPrecio = document.getElementsByClassName('precio');
/* Elementos del modo Obsucro */
let nav = document.getElementById('navi');
let svgLogo = document.getElementById('styleSvg');
let modObsureImge = document.getElementById('modObsureImge');
let listItems = document.querySelectorAll('.listItems');
let introduction = document.querySelector('.introduction');

/* ------------------- Renserizo los platos en el menú -------------- */
fetch("/platos.json")
    .then(response => {
        return response.json();
    })
    .then(jsondata => {
        jsondata.platos.forEach(element => {
            if (element.nombre != '') {
                platos.innerHTML +=
                    `<div>
                        <img src="${element.srcImg}" alt="">
                        <div>
                            <p><span>$</span>${element.precio}</p>
                            <p>stock: ${element.stock}<span id="stock"></span></p>
                            <p>${element.nombre}</p>
                            <button data-id="${element.index}" data-name="${element.nombre}" id="addButton">+</button>
                        </div>
                    </div>`
            }
        });
    });



/* ------------ seteo localstorage ------------- */
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
];
/* - actualizo y renderizo la informacion del localstorage */
function hiddenCuenta() {
    notItemImg.classList.add('hidden');
    itemsModal.classList.remove('hidden');
    itemsModal.classList.add('gridModal');
};

window.addEventListener('load', () => {

    /* seteo los datos del localstorage */
    for (let i = 0; i < localStorageValues.length; i++) {
        if (!localStorageValues[i].key) {
            localStorage.setItem(localStorageValues[i].value, '0');
        };
    };

    /* renderizo segun los datos del localstorage */
    if (localStorageValues[1].key === '1') {
        modObscureF();
    };

    if (localStorageValues[2].key && localStorageValues[2].key != "0") {
        hiddenCuenta();
    };

    cartMenu.innerText = localStorage.getItem('cartCount');
});

/* -------------------- Le agrego una animación al logo ---------------------------- */
function logoAnimation() {
    let iterator = 5;
    let timerId = setInterval(function () {
        svgElement[iterator].classList.toggle('off');
        iterator >= 1 ? iterator-- : iterator = 5 && clearInterval(timerId);
    }, 200)
};

/* delay y repeat de la animación  */
setInterval(function () {
    logoAnimation();
}, (Math.random() * (8000 - 3800) + 3800));

/* ------------------------------ Modo Oscuro------------------------------------ */
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

/* --------------------------------- carta menú (modal) --------------------------------- */
menu.addEventListener('click', () => {
    modal.classList.toggle('modalOn');
});

/* ---------------     Añadir elementos a la cuenta y localstorage  ------------- */
let cuenta = {

};

function insertPlatos(nombre, img, precio, stock, id) {
    if (cuenta[nombre]) {
        cuenta[nombre].click = cuenta[nombre].click + 1;
        for (let i = 0; i < spanPrecio.length; i++) {
            if (spanPrecio[i].dataset.span === id) {
                spanPrecio[i].innerText = cuenta[nombre].click * cuenta[nombre].precio;
            };
        };
    } else {
        cuenta[nombre] = { "click": 1, "precio": precio, "id": id }
        introPlatos.innerHTML += `
        <div >
            <img src="${img}" alt="">
            <h4>${nombre}</h4>
            <h4>${precio}</h4>
            <h4>${stock}</h4>
            <h4>subtotal: <span class="precio" data-span="${id}">${precio}</span></h4>
        </div>
    `;
    }
    let pony = 0;
    for (const property in cuenta) {
        pony = pony + cuenta[property].click;
    }
    cartMenu.innerText = pony;
    hiddenCuenta();
};

platos.addEventListener('click', e => {
    if (e.target.matches('#addButton')) {
        fetch("/platos.json")
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                jsondata.platos.forEach(element => {
                    if (element.index === e.target.dataset.id) {

                        insertPlatos(
                            element.nombre,
                            element.srcImg,
                            element.precio,
                            element.stock,
                            element.index
                        );
                    };
                });
            });
        console.log(cuenta);
    };
});
/* function setElementsLS() {
    elementsLocalStorage.forEach(element => {
        cuenta.push(element)
    });
};

let elementsLocalStorage = JSON.parse(localStorage.getItem('listItems'));
localStorage.getItem('listItems') != 0 ? setElementsLS() : console.log('Aún no hay pedidos');

const addProductsCar = (id, name) => {
    cuenta.push({
        id,
        name,
        'count': 0
    });
    localStorage.setItem('listItems', JSON.stringify(cuenta))
};

platos.addEventListener('click', e => {
    if (e.target.matches('#addButton')) {

        if (cuenta.length === 0) {
            addProductsCar(e.target.dataset.id, e.target.dataset.name);
        }

        cuenta.forEach(element => {
            if (element.id === e.target.dataset.id && element.id) {
                element.count = element.count + 1;
            };
        });

        fetch("/platos.json")
            .then(response => {
                return response.json();
            })
            .then(jsondata => {
                localStorage.setItem('listItems', JSON.stringify(cuenta));
            });

    };
    hiddenCuenta();
}); */