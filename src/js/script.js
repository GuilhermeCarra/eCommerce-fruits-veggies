/* GLOBAL VARIABLES */
var cart = [];

if (localStorage.getItem("shop") == null) {
    var shop = [];
    localStorage.setItem("shop", shop);
} else {
    var shop = JSON.parse(localStorage.getItem("shop"));
}
let products = shop.Products;

printProducts();

/* Home-page */

function printProducts() {
    let row = '<div class="row mb-4"></div>';
    let emptyCol = '<div class="col-2"></div>';
    let lines = Math.ceil(products.length / 4);

    for (let n = 0; n < lines; n++) {
        $("#footer").before($(row).append(
            emptyCol,
            makeCard(products),
            emptyCol
        ))
    }
}

function makeCard(products) {
    let emptyCol = '<div class="col-2"></div>';
    let card = '<div class="card"><div>';
    let img = '<img src="" class="card-img-top" data-toggle="modal" data-target="#product_details">';
    let cardBody = '<div class="card-body"></div>';
    let cardTitle = '<h5 class="card-title"></h5>';
    let cardText = '<p class="card-text"></p>';
    let cardProduct = [];
    for (let i = 0; i <4; i++) {
        if (products.length > 0) {
            cardProduct[i] = $(emptyCol).append(
                $(card).append(
                    $(img).attr("src",products[0].img).data("idProduct",products[0].id).click(showProduct),
                    $(cardBody).append(
                        $(cardTitle).text(products[0].title),
                        $(cardText).text(products[0].price+" €/pc")
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
    let idProduct = $(event.target).data("idProduct");
    let product = JSON.parse(localStorage.getItem("shop")).Products.find(({ id }) => id === idProduct);
    $(".img-thumbnail").removeClass("border-info");
    $("#productQnt").text("1");
    $("#detailsMainImg").attr("src",product.img).data("idProduct",idProduct);
    $("#product_details h5").text(product.category+" >");
    $("#details_title").text(product.title);
    $("#details_description").text(product.description);
    $("#details_price").text(product.price+" €/pc");
    $("#thumb1").attr("src",product.img).addClass("border-info").click(changeThumb);
    $("#thumb2").attr("src","src/img/"+idProduct+"_thumb2.jpg").click(changeThumb);
    $("#thumb3").attr("src","src/img/"+idProduct+"_thumb3.jpg").click(changeThumb);
}

function changeThumb(){
    $(".img-thumbnail").removeClass("border-info");
    $(event.target).addClass("border-info");
    $("#detailsMainImg").attr("src",$(event.target).attr("src"));
}

$("#restProduct").click(function() {
    let quantity = parseInt($("#productQnt").text());
    if(quantity > 1) {
        quantity--;
        $("#productQnt").text(quantity);
    }
});

$("#addProduct").click(function() {
    let quantity = parseInt($("#productQnt").text());
    quantity++;
    $("#productQnt").text(quantity);
});

$("#addCartBtn").click(function() {
    let quantity = parseInt($("#productQnt").text());
    let id = $("#product_details img").data("idProduct");
    let buy = {id:id, quantity:quantity};
    cart.push(buy);
    $('#product_details').modal('hide');
});