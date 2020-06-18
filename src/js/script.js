/* ---------------------------------------------------
    GLOBAL VARIABLES
----------------------------------------------------- */
var cart = [];

if (localStorage.getItem("shop") == null) {
    var shop = [];
    localStorage.setItem("shop", shop);
} else {
    var shop = JSON.parse(localStorage.getItem("shop"));
}

printProducts();

/* ---------------------------------------------------
    USER HOME-PAGE
----------------------------------------------------- */

function printProducts(filter) {
    $("#products_list").empty();
    let products;
    if (filter != undefined) {
        products = filter;
    } else {
        products = [...shop.Products];
    }
    let emptyCol = '<div class="col-3 pb-4"></div>';
    let card = '<div class="card"><div>';
    let img = '<img src="" class="card-img-top" data-toggle="modal" data-target="#product_details">';
    let cardBody = '<div class="card-body"></div>';
    let cardTitle = '<h5 class="card-title"></h5>';
    let cardText = '<p class="card-text"></p>';
    let productsNumber = products.length;

    for (let n = 0; n < productsNumber; n++) {
        $("#products_list").append(
            $(emptyCol).append(
                $(card).append(
                    $(img).attr("src",products[0].img).data("idProduct",products[0].id).click(showProduct),
                    $(cardBody).append(
                        $(cardTitle).text(products[0].title),
                        $(cardText).text(products[0].price+" €/pc")
                    )
                )
            )
        )
        products.shift();
    }
}

$("#categoryFilter").change(function() {
    $("#searchInput").val("");
    let filter = $(event.target).val();
    let filteredProducts;
    if ($("#categoryFilter").val() == "all") {
        filteredProducts = [...shop.Products];
    } else {
        filteredProducts = shop.Products.filter(function(product) {
            if (product.category == filter) return product
        });
    }
    printProducts(filteredProducts)
});

$("#searchInput").on('input',function(){
    $("#categoryFilter").val("all");
    let filter = $(event.target).val();
    let filteredProducts = shop.Products.filter(function(product) {
        if (product.title.toUpperCase().includes(filter.toUpperCase())) return product
    });
    printProducts(filteredProducts)
})

/* ---------------------------------------------------
    PRODUCT DETAILS PAGE
----------------------------------------------------- */

function showProduct() {
    let idProduct = $(event.target).data("idProduct");
    let product = JSON.parse(localStorage.getItem("shop")).Products.find(({ id }) => id === idProduct);
    $(".img-thumbnail").removeClass("border-info");
    $("#productQnt").text("1");
    $("#detailsMainImg").attr("src",product.img).data("idProduct",idProduct);
    $("#product_details h5").text(product.category);
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
    let foundOnCart = false;
    let quantity = parseInt($("#productQnt").text());
    let id = $("#product_details img").data("idProduct");
    for (i = 0; i < cart.length; i ++) {
        if (cart[i].id == id) {
            cart[i].quantity += quantity;
            foundOnCart = true;
        }
    }
    if (!foundOnCart) {
        let buy = {id:id, quantity:quantity};
        cart.push(buy);
    }
    $('#product_details').modal('hide');
});
