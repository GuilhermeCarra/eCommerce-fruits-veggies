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
}
let masterAdmin = {
  id: 1,
  name: "admin",
  surname: "administrator",
  email: "master",
  password: "1234"
}
shop.admins.push(masterAdmin);
localStorage.setItem("shopJSON", JSON.stringify(shop));

// EVENT LISTENERS
$(document).ready(function () {
  // Event listener to expand/collapse sidebar
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $('#content').toggleClass('active');
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
        $('.main-content').hide();
        $('.wrapper').css('display', 'flex');
      }, 1000)
    }
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

function appendAdmin(adminObj) {
  let $newRow = $('<tr>');
  let $id = $('<td>').text(adminObj.id).appendTo($newRow);
  let $name = $('<td>').text(adminObj.name).appendTo($newRow);
  let $surname = $('<td>').text(adminObj.surname).appendTo($newRow);
  let $email = $('<td>').text(adminObj.email).appendTo($newRow);
  let $btn = $('<td>').html('<button>Edit</button>').appendTo($newRow);
  //TODO: Add event listener to button
  $('#admin-table tbody').append($newRow);
}