import { updateTotal } from '../main.js';
import { formatNumber } from './helpers.js';

export function createCartLine(product, quantity) {
  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  /*
  <tr data-cart-product-id="1">
    <td>HTML húfa</td>
    <td>1</td>
    <td><span class="price">5.000 kr.-</span></td>
    <td><span class="price">5.000 kr.-</span></td>
    <td>
      <form class="remove" method="post">
        <button>Eyða</button>
      </form>
    </td>
  </tr>
  */

  const cartRowElement = document.createElement('tr');
  const cartRowTitleElement = document.createElement('td');
  const cartRowQuantityElement = document.createElement('td');
  const cartRowPriceElement = document.createElement('td');
  const cartRowPriceSpanElement = document.createElement('span');
  const cartRowTotalElement = document.createElement('td');
  const cartRowTotalSpanElement = document.createElement('span');
  const cartRowFormColumnElement = document.createElement('td');
  const cartRowFormElement = document.createElement('form');
  const cartRowFormButtonElement = document.createElement('button');

  cartRowTitleElement.textContent = product.title;
  cartRowQuantityElement.textContent = quantity;
  cartRowPriceSpanElement.textContent = formatNumber(product.price);
  cartRowTotalSpanElement.textContent = formatNumber(product.price * quantity);

  cartRowFormButtonElement.textContent = 'Eyða';

  cartRowElement.setAttribute('data-cart-product-id', product.id);
  cartRowPriceSpanElement.classList.add('price');
  cartRowTotalSpanElement.classList.add('price');
  cartRowFormElement.classList.add('remove');
  cartRowFormElement.setAttribute('method', 'post');

  cartRowTitleElement.classList.add('title');
  cartRowQuantityElement.classList.add('quantity');
  cartRowPriceElement.classList.add('price');
  cartRowTotalElement.classList.add('total');

  cartRowFormElement.appendChild(cartRowFormButtonElement);
  cartRowFormColumnElement.appendChild(cartRowFormElement);
  cartRowTotalElement.appendChild(cartRowTotalSpanElement);
  cartRowPriceElement.appendChild(cartRowPriceSpanElement);

  cartRowElement.appendChild(cartRowTitleElement);
  cartRowElement.appendChild(cartRowQuantityElement);
  cartRowElement.appendChild(cartRowPriceElement);
  cartRowElement.appendChild(cartRowTotalElement);
  cartRowElement.appendChild(cartRowFormColumnElement);

  // TODO hér þarf að búa til eventListener sem leyfir að eyða línu úr körfu

  cartRowFormButtonElement.addEventListener('click', function() {
    cartRowElement.remove();
    updateTotal();
  });

  return cartRowElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}
