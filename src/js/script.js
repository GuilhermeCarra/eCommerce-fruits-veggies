/* GLOBAL VARIABLES */
var cart = [];
// console.log(cart)
if (localStorage.getItem("shop") == null) {
    var shop = [];
    localStorage.setItem("shop", shop);
} else {
    var shop = JSON.parse(localStorage.getItem('shop'));
}
let products = shop.Products;

printProducts();

/* Home-page */

function printProducts() {
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
    let img = '<img src="" class="card-img-top" data-toggle="modal" data-target="#product_details">';
    let cardBody = '<div class="card-body"></div>';
    let cardTitle = '<h5 class="card-title"></h5>';
    let cardText = '<p class="card-text"></p>';
    let cardProduct = [];
    for (let i = 0; i < 4; i++) {
        if (products.length > 0) {
            cardProduct[i] = $(emptyCol).append(
                $(card).append(
                    $(img).attr("src", products[0].img).data("idProduct", products[0].id).click(showProduct),
                    $(cardBody).append(
                        $(cardTitle).text(products[0].title),
                        $(cardText).text(products[0].price + " €/pc")
                    )
                )
            )
            products.shift();

        }
    }
    return cardProduct;
}

/* Product Details Page */

function showProduct() {
    $("#productQnt").text("1");
    let product = JSON.parse(localStorage.getItem("shop")).Products.find(({
        id
    }) => id === $(event.target).data("idProduct"));
    $("#product_details img").attr("src", product.img).data("idProduct", $(event.target).data("idProduct"));
    $("#product_details h5").text(product.category + " >");
    $("#details_title").text(product.title);
    $("#details_description").text(product.description);
    $("#details_price").text(product.price + " €/pc");
}

$("#restProduct").click(function () {
    let quantity = parseInt($("#productQnt").text());
    if (quantity > 1) {
        quantity--;
        $("#productQnt").text(quantity);
    }
});

$("#addProduct").click(function () {
    let quantity = parseInt($("#productQnt").text());
    quantity++;
    $("#productQnt").text(quantity);
});

$("#addCartBtn").click(function () {
    let quantity = parseInt($("#productQnt").text());
    let id = $("#product_details img").data("idProduct");
    let buy = {
        id: id,
        quantity: quantity
    };
    cart.push(buy);
    $('#product_details').modal('hide');
})






// add to cart
let cartImage='<div class="col-4"><img src="" alt="" class="img-thumbnail"></div>' 
// let shopProducts = shop.Products
// console.log(shopProducts)


$("#cart-modal").click(function(){
  let cartsProducts = [];
  for(let i = 1; i < cart.length; i++){
    console.log(cart[i].id)

    let x = shop.Products.find(({ id }) => id === cart[i].id);
    console.log(x)
  }
  // console.log(cartsProducts)
})


