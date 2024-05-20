document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.icon-cart span');
    const listCart = document.querySelector('.listCart');

    let itemCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            itemCount++;
            cartItemCount.textContent = itemCount;

            const productCard = this.parentElement;
            const productImage = productCard.querySelector('img').src;
            const productName = productCard.querySelector('h2').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <div>
                    <h3>${productName}</h3>
                    <p>${productPrice}</p>
                </div>
            `;

            listCart.appendChild(cartItem);
        });
    });
});

 // Abre el carrito después de agregar un producto
 cartTab.style.display = 'block';


// Cierra el carrito cuando se hace clic en el botón de cerrar
closeCartButton.addEventListener('click', function () {
cartTab.style.display = 'none';
});

// Abre el carrito cuando se hace clic en el icono del carrito
cartIcon.addEventListener('click', function () {
cartTab.style.display = 'block';
});
