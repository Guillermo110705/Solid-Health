const headerMenu=document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 80){
        headerMenu.classList.add('header-fixed');
    }else{
        headerMenu.classList.remove('header-fixed');
    }
})


if(document.querySelector('.hm-tabs')){

    const tabLinks=document.querySelectorAll('.hm-tab-link');
    const tabsContent=document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if(document.querySelector('.tabs-content')){
        tabsContent[0].classList.add('tab-active');
    }
    

    for (let i = 0; i < tabLinks.length; i++) {
        
        tabLinks[i].addEventListener('click',()=>{

            
            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');
            
            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');
            
        });
        
    }

}

const menu=document.querySelector('.icon-menu');
const menuClose=document.querySelector('.cerrar-menu');

menu.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.add('active');
})

menuClose.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.remove('active');
})

let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let cart = [];

// Obtener productos directamente del HTML
let products = Array.from(listProductHTML.querySelectorAll('.item')).map(item => {
    return {
        id: item.dataset.id,
        name: item.querySelector('h2').textContent,
        price: parseFloat(item.querySelector('.price').textContent.replace('$', '')),
        image: item.querySelector('img').src
    };
});

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>`;
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    // Get data cart from memory
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
};

initApp();
