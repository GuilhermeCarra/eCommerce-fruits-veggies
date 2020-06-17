if (localStorage.getItem("shop") == null) {
    var shop = [];
    localStorage.setItem("shop", shop);
} else {
    var shop = JSON.parse(localStorage.getItem("shop"));
}
let products = shop.Products;

printProducts();

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
    let img = '<img src="" class="card-img-top">';
    let cardBody = '<div class="card-body"></div>';
    let cardTitle = '<h5 class="card-title">Apple</h5>';
    let cardText = '<p class="card-text">6,98</p>';
    let cardProduct = [];
    for (let i = 0; i <4; i++) {
        if (products.length > 0) {
            cardProduct[i] = $(emptyCol).append(
                $(card).append(
                    $(img).attr("src",products[0].img).data("idProduct",products[0].id).click(showProduct),
                    $(cardBody).append(
                        $(cardTitle).text(products[0].title),
                        $(cardText).text(products[0].price)
                        )
                        )
                        )
                    products.shift();
        }
    }
    return cardProduct;
}

function showProduct() {
    alert($(event.target).data("idProduct"));
}