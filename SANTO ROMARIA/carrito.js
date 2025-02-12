// Variables
let allContainerCart = document.querySelector('.products');
let containerBuyCart = document.querySelector('.card-items');
let priceTotal = document.querySelector('.price-total');
let amountProduct = document.querySelector('.count-product');

let buyThings = [];
let totalCard = 0;
let countProduct = 0;

// Listeners
loadEventListeners();
function loadEventListeners(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuyCart.addEventListener('click', deleteProduct);
}

// Función para agregar productos al carrito
function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

// Función para leer el contenido del producto seleccionado
function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: parseFloat(product.querySelector('div p span').textContent),
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }

    // Verificar si el producto ya existe en el carrito
    const existProduct = buyThings.find(product => product.id === infoProduct.id);
    if (existProduct) {
        existProduct.amount++;
    } else {
        buyThings.push(infoProduct);
        countProduct++;
    }

    // Actualizar el total del carrito
    totalCard = buyThings.reduce((sum, product) => sum + product.price * product.amount, 0);
    totalCard = totalCard.toFixed(2);

    loadHtml();
}

// Función para eliminar productos del carrito
function deleteProduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId = e.target.getAttribute('data-id');

        buyThings = buyThings.filter(product => {
            if (product.id === deleteId) {
                countProduct -= product.amount; // Restar la cantidad total de ese producto
                totalCard -= product.price * product.amount;
                return false; // Eliminar el producto
            }
            return true; // Mantener el producto
        });

        totalCard = totalCard.toFixed(2);

        // Si el carrito queda vacío, reiniciar valores
        if (buyThings.length === 0) {
            totalCard = 0;
            countProduct = 0;
        }

        loadHtml();
    }
}

// Función para cargar el HTML del carrito
function loadHtml(){
    clearHtml();
    buyThings.forEach(product => {
        const {image, title, price, amount, id} = product;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${image}" alt="">
            <div class="item-content">
                <h5>${title}</h5>
                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${amount}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        containerBuyCart.appendChild(row);
    });

    // Actualizar totales
    priceTotal.innerHTML = totalCard;
    amountProduct.innerHTML = countProduct;
}

// Función para limpiar el carrito
function clearHtml(){
    containerBuyCart.innerHTML = '';
}
