// GLOBAL VARIABLES
/* Generate "shop" object for the first time,
storing on it a master user to be able to log in */
let shop = JSON.parse(localStorage.getItem("shopJSON"));
if (!shop) {
  shop = {
    products: [],
    categories: [],
    admins: []
  };
  let masterAdmin = {
    id: 1,
    name: "admin",
    surname: "administrator",
    email: "master",
    password: "1234"
  }
  shop.admins.push(masterAdmin);
  let cat1 = {
    id: 1,
    name: "Fruits",
    color: "blue"
  }
  shop.categories.push(cat1);
  let cat2 = {
    id: 2,
    name: "Vegetables",
    color: "green"
  }
  shop.categories.push(cat2);
  let cat3 = {
    id: 3,
    name: "Juices",
    color: "orange"
  }
  shop.categories.push(cat3);
  let prod1 = {
    id: 1,
    title: "Watermelon",
    img: "src/img/watermelon.jpg",
    price: 6.98,
    description: "Whole watermelon about 6kg",
    stockQty: 1000,
    category: [
      "Fruits"
    ]
  }
  shop.products.push(prod1);
  let prod2 = {
    id: 2,
    title: "Apricot",
    img: "src/img/apricot.jpg",
    price: 1.8,
    description: "Basket of apricots 6 units",
    stockQty: 1000,
    category: [
      "Fruits"
    ]
  }
  shop.products.push(prod2);
  let prod3 = {
    id: 3,
    title: "Melon",
    img: "src/img/melon.jpg",
    price: 2.8,
    description: "Whole watermelon about 3kg",
    stockQty: 1000,
    category: [
      "Fruits"
    ]
  }
  shop.products.push(prod3);
  let prod4 = {
    id: 4,
    title: "Orange",
    img: "src/img/tangerine.jpg",
    price: 2.8,
    description: "Oranges mesh 2kg",
    stockQty: 1000,
    category: [
      "Fruits"
    ]
  }
  shop.products.push(prod4);
  let prod5 = {
    id: 5,
    title: "Apple",
    img: "src/img/apple.jpg",
    price: 2.8,
    description: "Basket of apples 4 units",
    stockQty: 1000,
    category: [
      "Fruits"
    ]
  }
  shop.products.push(prod5);
  localStorage.setItem("shopJSON", JSON.stringify(shop));
}

// EVENT LISTENERS
$(document).ready(function () {
  // Event listener to expand/collapse sidebar
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
    // Optional sidebar
    $('.list-unstyled').removeClass('show');
    $('#prodSubmenu').prev().attr('aria-expanded', 'false');
    $('#catSubmenu').prev().attr('aria-expanded', 'false');
    $('#adminSubmenu').prev().attr('aria-expanded', 'false');
  });
  // Event listener to validate login form
  var forms = document.getElementsByClassName('form-group');
  forms[0].addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    let adminName = validateLogin();
    if (adminName != "") {
      setTimeout(function () {
        $('.sidebar-header h3').text('Welcome ' + adminName + "!");
        $('.login-cont').hide();
        $('.wrapper').css('display', 'flex');
      }, 1000)
    }
  });
  // Event listener to load product list
  $('#prodSubmenu li:first-child').on('click', function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
  
    $('#product-table tbody').empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.products.forEach(product => {
      appendProduct(product);
    })
    $('#product-cont').removeClass("d-none");
  });
  // Event listener to load category list
  $('#catSubmenu li:first-child').on('click', function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
    $('#category-table tbody').empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.categories.forEach(category => {
      appendCategory(category);
    })
    $('#category-cont').removeClass("d-none");
  });
  // Event listener to load admins list
  $('#adminSubmenu li:first-child').on('click', function () {
    $(".admin-create-container").addClass("d-none");
    $(".admin-table-container").addClass("d-none");
    $('#admin-table tbody').empty();
    let shop = JSON.parse(localStorage.getItem("shopJSON"));
    shop.admins.forEach(admin => {
      appendAdmin(admin);
    })
    $('#admin-cont').removeClass("d-none");
  });
});


// AUXILIAR FUNCTIONS

function validateLogin() {
  let adminName = "";

  let emailFound = false;
  let email = document.getElementById('email');
  let emailValue = email.value.trim();

  let passwordFound = false;
  let password = document.getElementById('password');
  let passwordValue = password.value.trim();

  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  shop.admins.forEach(admin => {
    if (admin.email == emailValue) {
      emailFound = true;
      if (admin.password == passwordValue) {
        passwordFound = true;
        adminName = admin.name;
      }
    }
  })

  if (emailFound) {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  } else {
    email.classList.add('is-invalid');
  }
  if (passwordFound) {
    password.classList.remove('is-invalid');
    password.classList.add('is-valid');
  } else {
    password.classList.add('is-invalid');
  }
  return adminName;
}

//Create New Products
$("#addNewProduct").click(function () {
  
  $("#createNewCategory").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");
  $(".admin-table-container").addClass("d-none");

    $("#createNewProduct").removeClass("d-none");
});

//Create New Category
$("#addNewCategory").click(function () {
  $("#createNewProduct").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");
  $(".admin-table-container").addClass("d-none");

  $("#createNewCategory").removeClass("d-none");
});

//Create New Admin
$("#addNewAdmin").click(function () {
  $("#createNewProduct").addClass("d-none");
  $("#createNewCategory").addClass("d-none");
  $(".admin-table-container").addClass("d-none");

$("#createNewAdmin").removeClass("d-none");
})

function appendAdmin(adminObj) {
  let $newRow = $('<tr>');
  let $id = $('<td>').text(adminObj.id).appendTo($newRow);
  let $name = $('<td>').text(adminObj.name).appendTo($newRow);
  let $surname = $('<td>').text(adminObj.surname).appendTo($newRow);
  let $email = $('<td>').text(adminObj.email).appendTo($newRow);
  let $btnEdit = $('<td>').html('<i class="fas fa-marker"></i>').appendTo($newRow);
  //TODO: Add event listener to button
  let $btnRemove = $('<td>').html('<i class="fas fa-trash-alt"></i>').appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on('click', function () {
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
  $('#admin-table tbody').append($newRow);
}

function appendProduct(prodObj) {
  let $newRow = $('<tr>');
  let $id = $('<td>').text(prodObj.id).appendTo($newRow);
  let $name = $('<td>').text(prodObj.title).appendTo($newRow);
  let $price = $('<td>').text(prodObj.price).appendTo($newRow);
  let $stock = $('<td>').text(prodObj.stockQty).appendTo($newRow);
  let $btnEdit = $('<td>').html('<i class="fas fa-marker"></i>').appendTo($newRow);
  //TODO: Add event listener to button
  let $btnRemove = $('<td>').html('<i class="fas fa-trash-alt"></i>').appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on('click', function () {
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
  $('#product-table tbody').append($newRow);
}

function appendCategory(catObj) {
  let $newRow = $('<tr>');
  let $id = $('<td>').text(catObj.id).appendTo($newRow);
  let $name = $('<td>').text(catObj.name).appendTo($newRow);
  let $color = $('<td>').text(catObj.color).appendTo($newRow);
  let $btnEdit = $('<td>').html('<i class="fas fa-marker"></i>').appendTo($newRow);
  //TODO: Add event listener to button
  let $btnRemove = $('<td>').html('<i class="fas fa-trash-alt"></i>').appendTo($newRow);
  // Event listener to remove button
  $btnRemove.on('click', function () {
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
      alert('Deletion is not possible! Category being used by products.\nPlease delete products first.');
    }
  });
  $('#category-table tbody').append($newRow);
}

function getHighestId(objType) {
  let shop = JSON.parse(localStorage.getItem("shopJSON"));
  let highestId = 0;
  switch (objType) {
    case 'product':
      shop.products.forEach(product => {
        if (product.id > highestId) {
          highestId = product.id;
        }
      })
      break;
    case 'category':
      shop.categories.forEach(category => {
        if (category.id > highestId) {
          highestId = category.id;
        }
      })
      break;
    case 'admin':
      shop.admins.forEach(admin => {
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
  shop.categories.forEach(cat => {
    if (!cats.includes(cat.name)) {
      cats.push(cat.name);
    }
  })
  return cats;
}


//Validation add Category
$("#createCategoryBtn").click(function () {
  let isValid = validateCategory();
  if(isValid){
    //Create object category

    //Save object in LocalStorage

    //Hide form
  }
})

function validateCategory() {
  let categoryTitle = $("#categoryTitle").val();
}