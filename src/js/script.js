/* GLOBAL VARIABLES */
var cart = [];
// console.log(cart)
if (localStorage.getItem('shop') == null) {
  var shop = [];
  localStorage.setItem('shop', shop);
} else {
  var shop = JSON.parse(localStorage.getItem('shop'));
}

printProducts();

/* Home-page */

function printProducts() {
  let products = [...shop.Products];
  let row = '<div class="row mb-4"></div>';
  let emptyCol = '<div class="col-2"></div>';
  let lines = Math.ceil(products.length / 4);

  for (let n = 0; n < lines; n++) {
    $('#footer').before($(row).append(emptyCol, makeCard(products), emptyCol));
  }
}
let imge = '<img src="" class="card-img-top">';

function makeCard(products) {
  let emptyCol = '<div class="col-2"></div>';
  let card = '<div class="card"><div>';
  let img =
    '<img src="" class="card-img-top" data-toggle="modal" data-target="#product_details">';
  let cardBody = '<div class="card-body"></div>';
  let cardTitle = '<h5 class="card-title"></h5>';
  let cardText = '<p class="card-text"></p>';
  let cardProduct = [];
  for (let i = 0; i < 4; i++) {
    if (products.length > 0) {
      cardProduct[i] = $(emptyCol).append(
        $(card).append(
          $(img)
            .attr('src', products[0].img)
            .data('idProduct', products[0].id)
            .click(showProduct),
          $(cardBody).append(
            $(cardTitle).text(products[0].title),
            $(cardText).text(products[0].price + ' €/pc')
          )
        )
      );
      products.shift();
    }
  }
  return cardProduct;
}

/* Product Details Page */

function showProduct() {
  $('#productQnt').text('1');
  let product = JSON.parse(localStorage.getItem('shop')).Products.find(
    ({ id }) => id === $(event.target).data('idProduct')
  );
  $('#product_details img')
    .attr('src', product.img)
    .data('idProduct', $(event.target).data('idProduct'));
  $('#product_details h5').text(product.category + ' >');
  $('#details_title').text(product.title);
  $('#details_description').text(product.description);
  $('#details_price').text(product.price + ' €/pc');
}

$('#restProduct').click(function () {
  let quantity = parseInt($('#productQnt').text());
  if (quantity > 1) {
    quantity--;
    $('#productQnt').text(quantity);
  }
});

$('#addProduct').click(function () {
  let quantity = parseInt($('#productQnt').text());
  quantity++;
  $('#productQnt').text(quantity);
});

$('#addCartBtn').click(function () {
  let quantity = parseInt($('#productQnt').text());
  let id = $('#product_details img').data('idProduct');
  let buy = {
    id: id,
    quantity: quantity,
  };
  cart.push(buy);
  $('#product_details').modal('hide');
});

// add to cart
let row = '<div class="row"></div>';
let cartImage = '<div class="col-4"></div>';
let divColum = '<div class="col"></div>';
let shopProducts = shop.Products;
let total = 0;
$('#cart-modal').click(function () {
  $('#cart-content').empty();

  let cartsProducts = [];
  for (let i = 0; i < cart.length; i++) {
    console.log(cart[i].id);
    cartsProducts.push(shop.Products.find(({ id }) => id === cart[i].id));
  }
  for (let j = 0; j < cartsProducts.length; j++) {
    total += cart[j].quantity * cartsProducts[j].price;
    let piece;
    if (cart[j].quantity > 1) {
      piece = ' pieces';
    } else {
      piece = ' piece';
    }

    $('#cart-content')
      .append(
        $(row)
          .attr('id', 'row')
          .attr('data-id', cart[j].id)
          .append(
            $(cartImage).append(
              '<img class="img-thumbnail" src="' + cartsProducts[j].img + '" />'
            )
          )
          .append(
            $(divColum)
              .append($('<h6>', { text: cartsProducts[j].title }))
              .append($('<h6>', { text: cartsProducts[j].price + '\u20ac' }))
              .append(
                $('<span>', { text: cart[j].quantity })
                  .append($('<span>', { text: piece }))
                  .append(
                    $(
                      '<i id="remove-item" class="fas fa-trash float-right"></i>'
                    ).attr('data-id', cart[j].id)
                    // console.log(event.target)
                  )
              )
          )
      )
      .append($('<hr class="col-xs-12">'));
  }

  $('#cart-total').text(total.toFixed(2) + '\u20ac');
  //   console.log(cartsProducts)
});

$('#cart-content').on('click', '#remove-item', function (e) {
  console.log(e.target);
  let id = $(e.target).attr('data-id');
  console.log(id);
  // from variable
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      console.log(cart[i]);
      cart.splice(i, 1);
    }
  }
  // html
  $('div[data-id="' + id + '"]')
    .next()
    .remove();
  $('div[data-id="' + id + '"]').remove();
  let singlePrice = parseFloat($(this).parent().prev().text());
  let quantity = parseFloat($(this).parent().text());
  total = total - singlePrice * quantity;
  $('#cart-total').text(total.toFixed(2) + '\u20ac');
  $('#cart-content').show();
});
