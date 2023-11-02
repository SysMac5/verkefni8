import { createCartLine, showCartContent } from './lib/ui.js';
import { formatNumber  } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cart = document.querySelector('.cart-content');

  if (!cart) {
    console.warn('fann ekki .cart');
    return;
  }
  
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  const cartContent = cart.querySelectorAll('tr');
  for (var i = 0; i < cartContent.length; i++) {
    var dataCartProductId = Number(cartContent[i].getAttribute('data-cart-product-id'));
    if (dataCartProductId === product.id) {
      cartContent[i].remove();
    }
  }

  const cartLine = createCartLine(product, quantity);
  cart.appendChild(cartLine);

  // Sýna efni körfu
  showCartContent(true);

  // TODO sýna/uppfæra samtölu körfu
  updateTotal();
}

export function updateTotal() {
  const cartTotalElement = document.querySelector('.cart-total');
  const cart = document.querySelector('.cart-content');

  if (!cart || !cartTotalElement) {
    console.warn('fann ekki element');
    return;
  }

  const cartContent = cart.querySelectorAll('tr');

  var total = 0;
  
  for (var i = 0; i < cartContent.length; i++) {
    var dataCartProductId = Number(cartContent[i].getAttribute('data-cart-product-id'));
    var quantity = Number(cartContent[i].querySelector('.quantity')?.textContent);
    
    total += products[dataCartProductId - 1].price * quantity;
  }

  cartTotalElement.textContent = formatNumber(total);
}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr')

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input
  const quantityInput = parent.querySelector('input[type="number"]');
  const quantity = quantityInput.value;

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}

// TODO bæta við event handler á form sem submittar pöntun

function buyHandler(event) {
  event.preventDefault();
  
  
}