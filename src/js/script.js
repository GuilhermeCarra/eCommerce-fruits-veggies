/* ---------------------------------------------------
    GLOBAL VARIABLES
----------------------------------------------------- */
var cart = [];
var total = 0;

if (localStorage.getItem('shopJSON') == null) {
    var shop = [];
    localStorage.setItem('shopJSON', shop);
} else {
    var shop = JSON.parse(localStorage.getItem('shopJSON'));
}

printProducts();

/* ---------------------------------------------------
    USER HOME-PAGE
----------------------------------------------------- */

// Takes all products on localStorage and print them on Home-Screen. Filter option with category or by text on search bar.
function printProducts(filter) {
    // Emptying already printed products
    $("#products_list").empty();

    // Verifying if products are filtered
    let products = filter == undefined ? [...shop.Products] : filter;

    let emptyCol = '<div class="col-sm-6 col-md-4 col-lg-3 pb-4"></div>';
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
                    $(img).attr("src", products[0].img).data("idProduct", products[0].id).click(showProduct),
                    $(cardBody).append(
                        $(cardTitle).text(products[0].title),
                        $(cardText).text(products[0].price + " €/pc")
                    )
                )
            )
        )
        products.shift();
    }
}

// Select handler that filters printed products on Home-Page by category (Fruit,Vegetables,Juice...)
$("#categoryFilter").change(function () {
    $("#searchInput").val("");
    let filter = $(event.target).val();
    let filteredProducts;
    if ($("#categoryFilter").val() == "all") {
        filteredProducts = [...shop.Products];
    } else {
        filteredProducts = shop.Products.filter(function (product) {
            if (product.category == filter) return product
        });
    }
    printProducts(filteredProducts)
});

// Input handler that search for the name inserted on products localStorage
$("#searchInput").on('input', function () {
    $("#categoryFilter").val("all");
    let filter = $(event.target).val();
    let filteredProducts = shop.Products.filter(function (product) {
        if (product.title.toUpperCase().includes(filter.toUpperCase())) return product
    });
    printProducts(filteredProducts)
})

/* ---------------------------------------------------
    PRODUCT DETAILS PAGE
----------------------------------------------------- */

// When a product is clicked on Home-Screen show the product details on a modal
function showProduct() {
    let idProduct = $(event.target).data("idProduct");
    let product = JSON.parse(localStorage.getItem("shopJSON")).Products.find(({
        id
    }) => id === idProduct);
    $(".img-thumbnail").removeClass("border-info");
    $("#productQnt").text("1");
    $("#detailsMainImg").attr("src", product.img).data("idProduct", idProduct);
    $("#product_details h5").text(product.category);
    $("#details_title").text(product.title);
    $("#details_description").text(product.description);
    $("#details_price").text(product.price + " €/pc");
    $("#thumb1").attr("src", product.img).addClass("border-info").click(changeThumb);
    $("#thumb2").attr("src", "src/img/" + idProduct + "_thumb2.jpg").click(changeThumb);
    $("#thumb3").attr("src", "src/img/" + idProduct + "_thumb3.jpg").click(changeThumb);
}

// Handler on thumbnail to change the big image on product details
function changeThumb() {
    $(".img-thumbnail").removeClass("border-info");
    $(event.target).addClass("border-info");
    $("#detailsMainImg").attr("src", $(event.target).attr("src"));
}

// Button handler to decrease quantity before adding to cart
$('#restProduct').click(function () {
    let quantity = parseInt($('#productQnt').text());
    if (quantity > 1) {
        quantity--;
        $('#productQnt').text(quantity);
    }
});

// Button handler to increase quantity before adding to cart
$('#addProduct').click(function () {
    let quantity = parseInt($('#productQnt').text());
    quantity++;
    $('#productQnt').text(quantity);
});

// Button handler when user wants to add a product to the cart
$("#addCartBtn").click(function () {
    let foundOnCart = false;
    let quantity = parseInt($("#productQnt").text());
    let id = $("#product_details img").data("idProduct");

    // Search on cart variable if this item is already present on cart
    for (i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].quantity += quantity;
            foundOnCart = true;
        }
    }
    if (!foundOnCart) {
        let buy = {
            id: id,
            quantity: quantity
        };
        cart.push(buy);
    }
    $('#product_details').modal('hide');
});

/* ---------------------------------------------------
    SHOW OPEN CART
----------------------------------------------------- */

$('#cart-modal').click(showCart);

function showCart () {
    // Emptying cart modal HTML to not repeat the same products
    $('#cart-content').empty();

    let row = '<div class="row"></div>';
    let cartImage = '<div class="col-4"></div>';
    let divColum = '<div class="col"></div>';
    let cartsProducts = [];

    // Retrieving information on localStorage about the itens on cart (price, img)
    for (let i = 0; i < cart.length; i++) {
        cartsProducts.push(shop.Products.find(({id}) => id === cart[i].id));
    }

    // Printing each product on cart modal with all the information (price, img, quantity)
    for (let j = 0; j < cartsProducts.length; j++) {
        total += cart[j].quantity * cartsProducts[j].price;
        let piece = cart[j].quantity > 1 ? " pieces" : " piece";
        $('#cart-content').append(
                $(row).attr('data-id', cart[j].id)
                .append($(cartImage).append('<img class="img-thumbnail" src="' + cartsProducts[j].img + '" />'))
                .append($(divColum)
                    .append($('<h6>', {text: cartsProducts[j].title}))
                    .append($('<h6>', {text: cartsProducts[j].price + '\u20ac'}))
                    .append($('<span>', {text: cart[j].quantity})
                        .append($('<span>', {text: piece}))
                        .append($('<i id="remove-item" class="fas fa-trash float-right"></i>').attr('data-id', cart[j].id)
                        )
                    )
                )
            ).append($('<hr class="col-xs-12">'));
    }
    $('#cart-total').text(total.toFixed(2) + '\u20ac');
}

// Button handler to remove an item from cart (trash can icon)
$('#cart-content').on('click', '#remove-item', function (e) {
    let id = $(e.target).attr('data-id');

    // Remove product from Cart variable
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) cart.splice(i, 1);
    }
    // Remove product from HTML Cart
    $('div[data-id="' + id + '"]').next().remove();
    $('div[data-id="' + id + '"]').remove();
    let singlePrice = parseFloat($(this).parent().prev().text());
    let quantity = parseFloat($(this).parent().text());
    total = total - singlePrice * quantity;
    $('#cart-total').text(total.toFixed(2) + '\u20ac');
    $('#cart-content').show();
});
