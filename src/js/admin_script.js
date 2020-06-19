$(document).ready(function () {
  // Event listener to expand/collapse sidebar
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
  // Event listener to validate login form
  var forms = document.getElementsByClassName('form-group');
  forms[0].addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();
    let isValid = validateLogin();
    if (isValid) {
      setTimeout(function () {
        $('.main-content').hide();
        $('.wrapper').css('display', 'flex');
      }, 1000)
    }
  });
});

function validateLogin() {
  let validated = true;
  let email = document.getElementById('email');
  let emailValue = email.value.trim();
  if (emailValue === '') {
    email.classList.add('is-invalid');
    validated = false;
  } else {
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
  }
  let password = document.getElementById('password');
  let passwordValue = password.value.trim();
  if (passwordValue === '') {
    password.classList.add('is-invalid');
    validated = false;
  } else {
    password.classList.remove('is-invalid');
    password.classList.add('is-valid');
  }
  return validated;
}


//Create New Products
$("#addNewProduct").click(function () {
  
  $("#createNewCategory").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");

    $("#createNewProduct").removeClass("d-none");
});

//Create New Category
$("#addNewCategory").click(function () {
  $("#createNewProduct").addClass("d-none");
  $("#createNewAdmin").addClass("d-none");

  $("#createNewCategory").removeClass("d-none");
});

//Create New Admin
$("#addNewAdmin").click(function () {
  $("#createNewProduct").addClass("d-none");
  $("#createNewCategory").addClass("d-none");

$("#createNewAdmin").removeClass("d-none");
})



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

