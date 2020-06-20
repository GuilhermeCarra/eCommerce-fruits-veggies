// GLOBAL VARIABLES
/* Generate "shop" object for the first time,
storing on it a master user to be able to log in */
let shop = JSON.parse(localStorage.getItem("shopJSON"));
if (!shop) {
  shop = {
    products: [],
    categories: [],
    admins: [],
  };
  let masterAdmin = {
    id: 1,
    name: "admin",
    surname: "administrator",
    email: "master",
    password: "1234",
  };
  shop.admins.push(masterAdmin);
  let cat1 = {
    id: 1,
    name: "Fruits",
    color: "Blue",
  };
  shop.categories.push(cat1);
  let cat2 = {
    id: 2,
    name: "Vegetables",
    color: "Green",
  };
  shop.categories.push(cat2);
  let cat3 = {
    id: 3,
    name: "Juices",
    color: "Yellow",
  };
  shop.categories.push(cat3);
  let prod1 = {
    id: 1,
    title: "Watermelon",
    img: "src/img/watermelon.jpg",
    price: 6.98,
    description: "Whole watermelon about 6kg",
    stockQty: 1000,
    category: ["Fruits"],
  };
  shop.products.push(prod1);
  let prod2 = {
    id: 2,
    title: "Apricot",
    img: "src/img/apricorn.jpg",
    price: 1.8,
    description: "Basket of apricots 6 units",
    stockQty: 1000,
    category: ["Fruits"],
  };
  shop.products.push(prod2);
  let prod3 = {
    id: 3,
    title: "Melon",
    img: "src/img/melon.jpg",
    price: 2.8,
    description: "Whole watermelon about 3kg",
    stockQty: 1000,
    category: ["Fruits"],
  };
  shop.products.push(prod3);
  let prod4 = {
    id: 4,
    title: "Orange",
    img: "src/img/tangerine.jpg",
    price: 2.8,
    description: "Oranges mesh 2kg",
    stockQty: 1000,
    category: ["Fruits"],
  };
  shop.products.push(prod4);
  let prod5 = {
    id: 5,
    title: "Apple",
    img: "src/img/apple.jpg",
    price: 2.8,
    description: "Basket of apples 4 units",
    stockQty: 1000,
    category: ["Fruits"],
  };
  shop.products.push(prod5);
  localStorage.setItem("shopJSON", JSON.stringify(shop));
}

// EVENT LISTENERS
$(document).ready(function () {
  // Event listener to expand/collapse sidebar
  $("#sidebarCollapse").on("click", function () {
    $("#sidebar").toggleClass("active");
    $("#content").toggleClass("active");
    // Optional sidebar
    $(".list-unstyled").removeClass("show");
    $("#prodSubmenu").prev().attr("aria-expanded", "false");
    $("#catSubmenu").prev().attr("aria-expanded", "false");
    $("#adminSubmenu").prev().attr("aria-expanded", "false");
  });
  // Event listener to validate login form
  var forms = document.getElementsByClassName("form-group");
  forms[0].addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();
    let adminName = validateLogin();
    if (adminName != "") {
      setTimeout(function () {
        $(".sidebar-header h3").text("Welcome " + adminName + "!");
        $(".login-cont").hide();
        $(".wrapper").css("display", "flex");
      }, 1000);
    }
  });
  // Event listener to load product list
  $("#prodSubmenu li:first-child").on("click", function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");

    $("#product-table tbody").empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.products.forEach((product) => {
      appendProduct(product);
    });
    $("#product-cont").removeClass("d-none");
  });
  // Event listener to load category list
  $("#catSubmenu li:first-child").on("click", function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
    $("#category-table tbody").empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.categories.forEach((category) => {
      appendCategory(category);
    });
    $("#category-cont").removeClass("d-none");
  });
  // Event listener to load admins list
  $("#adminSubmenu li:first-child").on("click", function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
    $("#admin-table tbody").empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.admins.forEach((admin) => {
      appendAdmin(admin);
    });
    $("#admin-cont").removeClass("d-none");
  });
  // Event listener to hide all result windows
  $(".bi-emoji-smile-upside-down").on("click", function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
  });
});

//Create New Products
$("#addNewProduct").click(function () {
  // Clear inputs
  $("#createNewProduct .form-control").val("");
  // Remove valid/invalid warnings
  $("#createNewProduct .form-control").removeClass("is-valid");
  $("#createNewProduct .form-control").removeClass("is-invalid");
  $("#invalid-cat").addClass("d-none");
  // Update category checkboxes
  $(".form-check").remove();
  let cats = getExistingCategories();
  cats.forEach((cat) => {
    generateCheckbox(cat);
  });
  // Show/hide corresponding windows
  $("#createNewCategory").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");
  $(".admin-table-container").addClass("d-none");
  $("#createNewProduct").removeClass("d-none");
  $("#editProdBtn").addClass("d-none");
  $("#createProdBtn").removeClass("d-none");
});

//Create New Category
$("#addNewCategory").click(function () {
  $("#categoryTitle").val("");
  $("#chooseColorCategory").val("Choose Color..");
  $("#categoryTitle").removeClass("is-valid");
  $("#chooseColorCategory").removeClass("is-valid");
  $("#categoryTitle").removeClass("is-invalid");
  $("#chooseColorCategory").removeClass("is-invalid");

  $("#createNewProduct").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");
  $(".admin-table-container").addClass("d-none");

  $("#createNewCategory").removeClass("d-none");

  $("#createCategoryBtn").removeClass("d-none");
  $("#editCategoryBtn").addClass("d-none");
});

//Create New Admin
$("#addNewAdmin").click(function () {
  $("#createNewProduct").addClass("d-none");
  $("#createNewCategory").addClass("d-none");
  $(".admin-table-container").addClass("d-none");

  $("#createNewAdmin").removeClass("d-none");
});

//Validation add Category
$("#createCategoryBtn").click(function (e) {
  e.preventDefault();

  let isValid = validateCategory();
  if (isValid) {
    //Create object category
    let newId = getHighestId("category") + 1;
    let newCat = {
      id: newId,
      name: $("#categoryTitle").val().trim(),
      color: $("#chooseColorCategory").val(),
    };
    //Save object in LocalStorage
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.categories.push(newCat);
    localStorage.setItem("shopJSON", JSON.stringify(shop));
    //Hide form
    $("#createNewCategory").addClass("d-none");
  }
});

// Validation edit Category
$("#editCategoryBtn").click(function (e) {
  e.preventDefault();

  let isValid = validateEditedCat();
  if (isValid) {
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.categories.forEach((cat) => {
      if (cat.id == $("#categoryTitle").data("catid")) {
        cat.name = $("#categoryTitle").val().trim();
        cat.color = $("#chooseColorCategory").val();
        $("#categoryTitle").removeData("catid");
        $("#categoryTitle").removeAttr("data-catid");
        localStorage.setItem("shopJSON", JSON.stringify(shop));
      }
    });
    // Hide form
    $("#createNewCategory").addClass("d-none");
    $("#categoryTitle").removeClass("is-valid");
    $("#chooseColorCategory").removeClass("is-valid");
    // Show list
    $("#category-table tbody").empty();
    shop.categories.forEach((cat) => {
      appendCategory(cat);
    });
    $("#category-cont").removeClass("d-none");
  }
});

// Validation add Product
$("#createProdBtn").on("click", function (e) {
  e.preventDefault();

  let results = validateProduct();
  let isValid = results[0];
  let categories = results[1];
  if (isValid) {
    //Create product object
    let newId = getHighestId("product") + 1;
    let newProd = {
      id: newId,
      title: $("#productTitle").val().trim(),
      img: $("#imgUrl").val().trim(),
      price: parseFloat($("#productPrice").val().trim()),
      description: $("#productDescription").val().trim(),
      stockQty: parseFloat($("#itemsStock").val().trim()),
      category: categories,
    };
    //Save object in LocalStorage
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.products.push(newProd);
    localStorage.setItem("shopJSON", JSON.stringify(shop));
    //Hide form
    $("#createNewProduct").addClass("d-none");
  }
});

// AUXILIAR FUNCTIONS

function validateLogin() {
  let adminName = "";

  let emailFound = false;
  let email = document.getElementById("email");
  let emailValue = email.value.trim();

  let passwordFound = false;
  let password = document.getElementById("password");
  let passwordValue = password.value.trim();

  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  shop.admins.forEach((admin) => {
    if (admin.email == emailValue) {
      emailFound = true;
      if (admin.password == passwordValue) {
        passwordFound = true;
        adminName = admin.name;
      }
    }
  });

  if (emailFound) {
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
  } else {
    email.classList.add("is-invalid");
  }
  if (passwordFound) {
    password.classList.remove("is-invalid");
    password.classList.add("is-valid");
  } else {
    password.classList.add("is-invalid");
  }
  return adminName;
}

function appendAdmin(adminObj) {
  let $newRow = $("<tr>");
  let $id = $("<td>").text(adminObj.id).appendTo($newRow);
  let $name = $("<td>").text(adminObj.name).appendTo($newRow);
  let $surname = $("<td>").text(adminObj.surname).appendTo($newRow);
  let $email = $("<td>").text(adminObj.email).appendTo($newRow);
  let $btnEdit = $("<td>")
    .html('<i class="fas fa-marker"></i>')
    .appendTo($newRow);
  //TODO: Add event listener to button
  let $btnRemove = $("<td>")
    .html('<i class="fas fa-trash-alt"></i>')
    .appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on("click", function () {
    let id = adminObj.id;
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    for (let i = 0; i < shop.admins.length; i++) {
      if (shop.admins[i].id == id) {
        shop.admins.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("shopJSON", JSON.stringify(shop));
    $(this).parent().remove();
  });
  $("#admin-table tbody").append($newRow);
}

function appendProduct(prodObj) {
  let $newRow = $("<tr>");
  let $id = $("<td>").text(prodObj.id).appendTo($newRow);
  let $name = $("<td>").text(prodObj.title).appendTo($newRow);
  let $price = $("<td>").text(prodObj.price).appendTo($newRow);
  let $stock = $("<td>").text(prodObj.stockQty).appendTo($newRow);

  let $btnEdit = $("<td>")
    .html('<i class="fas fa-marker"></i>')
    .appendTo($newRow);
  // Event listener to edit button
  $btnEdit.on("click", function () {
    // Show/hide corresponding windows
    $("#product-cont").addClass("d-none");
    $("#createNewProduct").removeClass("d-none");
    $("#createProdBtn").addClass("d-none");
    $("#editProdBtn").removeClass("d-none");
    // Update category checkboxes
    $(".form-check").remove();
    let cats = getExistingCategories();
    cats.forEach((cat) => {
      generateCheckbox(cat);
    });
    // Recover object values into the form
    $("#productTitle").val(prodObj.title);
    $("#productPrice").val(prodObj.price);
    $("#imgUrl").val(prodObj.img);
    $("#productDescription").val(prodObj.description);
    $("#itemsStock").val(prodObj.stockQty);
    $(".form-check-input").each(function (item, element) {
      if (prodObj.category.includes($(element).val())) {
        $(element).attr("checked", "true");
      }
    });
    // Remove valid/invalid warnings
    $("#createNewProduct .form-control").removeClass("is-valid");
    $("#createNewProduct .form-control").removeClass("is-invalid");
    $("#invalid-cat").addClass("d-none");
  });

  let $btnRemove = $("<td>")
    .html('<i class="fas fa-trash-alt"></i>')
    .appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on("click", function () {
    let id = prodObj.id;
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    for (let i = 0; i < shop.products.length; i++) {
      if (shop.products[i].id == id) {
        shop.products.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("shopJSON", JSON.stringify(shop));
    $(this).parent().remove();
  });
  $("#product-table tbody").append($newRow);
}

function appendCategory(catObj) {
  let $newRow = $("<tr>");
  let $id = $("<td>").text(catObj.id).appendTo($newRow);
  let $name = $("<td>").text(catObj.name).appendTo($newRow);
  let $color = $("<td>").text(catObj.color).appendTo($newRow);
  let $btnEdit = $("<td>")
    .html('<i class="fas fa-marker"></i>')
    .appendTo($newRow);
  //Event listener to edit button
  $btnEdit.on("click", function () {
    // Show/hide corresponding windows
    $("#category-cont").addClass("d-none");
    $("#createCategoryBtn").addClass("d-none");
    $("#editCategoryBtn").removeClass("d-none");
    $("#createNewCategory").removeClass("d-none");
    $("#categoryTitle").removeClass("is-valid");
    $("#chooseColorCategory").removeClass("is-valid");
    $("#categoryTitle").removeClass("is-invalid");
    $("#chooseColorCategory").removeClass("is-invalid");
    // Recover object values into the form
    $("#categoryTitle").val(catObj.name);
    $("#categoryTitle").attr("data-catId", catObj.id);
    $("#chooseColorCategory").val(catObj.color);
  });
  let $btnRemove = $("<td>")
    .html('<i class="fas fa-trash-alt"></i>')
    .appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on("click", function () {
    let id = catObj.id;
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    let found = false;
    for (let i = 0; i < shop.products.length; i++) {
      for (let j = 0; j < shop.products[i].category.length; j++) {
        if (shop.products[i].category[j] == catObj.name) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      for (let i = 0; i < shop.categories.length; i++) {
        if (shop.categories[i].id == id) {
          shop.categories.splice(i, 1);
          break;
        }
      }
      localStorage.setItem("shopJSON", JSON.stringify(shop));
      $(this).parent().remove();
    } else {
      alert(
        "Deletion is not possible! Category being used by products.\nPlease delete products first."
      );
    }
  });
  $("#category-table tbody").append($newRow);
}

function getHighestId(objType) {
  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  let highestId = 0;
  switch (objType) {
    case "product":
      shop.products.forEach((product) => {
        if (product.id > highestId) {
          highestId = product.id;
        }
      });
      break;
    case "category":
      shop.categories.forEach((category) => {
        if (category.id > highestId) {
          highestId = category.id;
        }
      });
      break;
    case "admin":
      shop.admins.forEach((admin) => {
        if (admin.id > highestId) {
          highestId = admin.id;
        }
      });
  }
  return highestId;
}

function getExistingCategories() {
  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  let cats = [];
  shop.categories.forEach((cat) => {
    if (!cats.includes(cat.name)) {
      cats.push(cat.name);
    }
  });
  return cats;
}

function validateProduct() {
  let validated = true;

  let prodName = $("#productTitle").val().trim();
  if (prodName == "") {
    $("#productTitle").addClass("is-invalid");
    validated = false;
  } else {
    $("#productTitle").removeClass("is-invalid");
    $("#productTitle").addClass("is-valid");
  }

  let price = $("#productPrice").val().trim();
  if (price == "" || parseFloat(price) <= 0) {
    $("#productPrice").addClass("is-invalid");
    validated = false;
  } else {
    $("#productPrice").removeClass("is-invalid");
    $("#productPrice").addClass("is-valid");
  }

  let url = $("#imgUrl").val().trim();
  if (url == "") {
    $("#imgUrl").addClass("is-invalid");
    validated = false;
  } else {
    $("#imgUrl").removeClass("is-invalid");
    $("#imgUrl").addClass("is-valid");
  }

  let stock = $("#itemsStock").val().trim();
  if (stock == "" || parseFloat(stock) <= 0) {
    $("#itemsStock").addClass("is-invalid");
    validated = false;
  } else {
    $("#itemsStock").removeClass("is-invalid");
    $("#itemsStock").addClass("is-valid");
  }

  let catBoxes = $("#createNewProduct input[type=checkbox]");
  let categories = [];
  $(catBoxes).each(function (index, element) {
    if ($(element).prop("checked") == true) {
      categories.push($(element).val());
    }
  });
  if (categories.length > 0) {
    $("#invalid-cat").addClass("d-none");
  } else {
    $("#invalid-cat").removeClass("d-none");
    validated = false;
  }
  return [validated, categories];
}

function validateCategory() {
  let validated = false;
  let categoryNameOk = false;
  let categoryColorOk = false;

  let categoryTitle = $("#categoryTitle").val().trim();
  if (categoryTitle == "") {
    $("#categoryTitle").addClass("is-invalid");
    $("#categoryEx").addClass("d-none");
    $("#categoryEmpty").removeClass("d-none");
  }
  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  let found = false;
  shop.categories.forEach((cat) => {
    if (cat.name == categoryTitle) {
      found = true;
    }
  });
  if (categoryTitle != "" && !found) {
    $("#categoryTitle").removeClass("is-invalid");
    $("#categoryTitle").addClass("is-valid");
    categoryNameOk = true;
  }
  if (found) {
    $("#categoryTitle").addClass("is-invalid");
    $("#categoryEmpty").addClass("d-none");
    $("#categoryEx").removeClass("d-none");
  }
  let categoryColor = $("#chooseColorCategory").val();
  if (categoryColor == "Choose Color..") {
    $("#chooseColorCategory").addClass("is-invalid");
  } else {
    $("#chooseColorCategory").removeClass("is-invalid");
    $("#chooseColorCategory").addClass("is-valid");
    categoryColorOk = true;
  }
  if (categoryNameOk && categoryColorOk) {
    validated = true;
  }
  return validated;
}

function validateEditedCat() {
  let id = $("#categoryTitle").data("catid");

  let validated = false;
  let categoryNameOk = false;
  let categoryColorOk = false;

  let categoryTitle = $("#categoryTitle").val().trim();
  if (categoryTitle == "") {
    $("#categoryTitle").addClass("is-invalid");
    $("#categoryEx").addClass("d-none");
    $("#categoryEmpty").removeClass("d-none");
  }
  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  let found = false;
  for (let i = 0; i < shop.categories.length; i++) {
    if (shop.categories[i].id == id) {
      continue;
    } else if (shop.categories[i].name == categoryTitle) {
      found = true;
      break;
    }
  }
  if (categoryTitle != "" && !found) {
    $("#categoryTitle").removeClass("is-invalid");
    $("#categoryTitle").addClass("is-valid");
    categoryNameOk = true;
  }
  if (found) {
    $("#categoryTitle").addClass("is-invalid");
    $("#categoryEmpty").addClass("d-none");
    $("#categoryEx").removeClass("d-none");
  }
  let categoryColor = $("#chooseColorCategory").val();
  if (categoryColor == "Choose Color..") {
    $("#chooseColorCategory").addClass("is-invalid");
  } else {
    $("#chooseColorCategory").removeClass("is-invalid");
    $("#chooseColorCategory").addClass("is-valid");
    categoryColorOk = true;
  }
  if (categoryNameOk && categoryColorOk) {
    validated = true;
  }
  return validated;
}

function generateCheckbox(str) {
  let $div = $("<div>").addClass("form-check form-check-inline");
  let $input = $("<input>").addClass("form-check-input");
  $input.attr("type", "checkbox");
  $input.attr("id", str);
  $input.attr("value", str);
  let $label = $("<label>").addClass("form-check-label");
  $label.attr("for", $input.attr("id"));
  $label.text(str);
  $div.append($input).append($label);
  $("#cat-cont").prepend($div);
}
