var currentTab = 0;
var x;
var prevBtn; 
var nextBtn; 
var form;
let showHideEle = (element, prop) => {
  element.css("display", prop);
};
let msg = (msg1) => {
  console.log(msg1);
};
function showTab(n) {
  showHideEle(x.eq(n), "block");
  if (n == 0) {
    showHideEle(prevBtn, "none");
  } else {
    showHideEle(prevBtn, "inline");
  }
  msg(n)
  msg(x.length)
  if ((n) == x.length - 1) {
    nextBtn.html("Submit");
  } else {
    nextBtn.html("Next");
    // nextBtn.removeAttr("type").attr("type", "button");
  }
}

function nextPrev(n) {
  if (n == 1 && !form.valid()) return false;
  showHideEle(x.eq(currentTab), "none");
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    nextBtn.removeAttr("type").attr("type", "submit");
  } else {
    nextBtn.removeAttr("type").attr("type", "button");

  }
  showTab(currentTab);
}

$(document).ready(function () {
  form = $("#regForm");
  $(".min-today").prop("min", function () {
    return new Date().toJSON().split("T")[0] + " 00:00:00";
  });
  x = $(".tab");
  prevBtn = $("#prevBtn");
  nextBtn = $("#nextBtn");
  showTab(currentTab);
  $("#prevBtn").click(function () {
    nextPrev(-1);
  });

  $("#nextBtn").click(function () {
    nextPrev(1);
  });
  $("#mail-in-repair").attr("disabled", "disabled");

  form.validate({
    rules: {
      zipcode: { required: true, minlength: 5, maxlength: 5 },
      "available-area": { required: true },
      cellphoneCompany: { required: true },
      "available-area": { required: true },
      phone_model: { required: true },
      "device-issue": { required: true },
      "store-location": { required: true },
      firstname: { required: true, minlength: 5 },
      lastname: { required: true, minlength: 5 },
      phone: { required: true },
      email: { required: true, minlength: 10 },
      appointment: { required: true },
    },
    messages: {
      zipcode: {
        required: "Zipcode is required",
        minlength: "Zip code min length is 5",
        maxlength: "Zip code max length is 5",
      },
      "available-area": {
        required: "Area is required",
      },
      cellphoneCompany: {
        required: "Select Smart phone Company",
      },
      phone_model: {
        required: "Select 1 phone modal",
      },
      "device-issue": {
        required: "Select phone damage",
      },
      lastname: {
        required: "lastname is required",
        minlength: "lastname min length is 5",
      },
      firstname: {
        required: "firstname is required",
        minlength: "firstname  min length is 5",
      },
      phone: {
        required: "Phone number is required",
      },
      email: {
        required: "Email is required",
      },
    },
  });

  $("#regForm").submit(function (e) {
    e.preventDefault();
    showHideEle($(".tab-section"), "none")
    showHideEle($('.thankyou'), "block")
    showHideEle($('.nextprev'), "none");

    $.ajax({
      type: "POST",
      url: 'mail.php',
      data: $(this).serialize(),
      success: function(response)
      {
        console.log(response)
          //var jsonData = JSON.parse(response);

          // user is logged in successfully in the back-end 
          // let's redirect 
          // if (jsonData.success == "1")
          // {
          //     location.href = 'my_profile.php';
          // }
          // else
          // {
          //     alert('Invalid Credentials!');
          // }
     }
    });
  });

  $('select[name="cellphoneCompany"]').change(() => {
    let val = $("option:selected", this).val();
    if (val == "") {
      $(".radiobtnshowhide").removeAttr("name");
      $("#othermodels").removeAttr("name");

      showHideEle($(".iphone"), "none");
      showHideEle($(".samsung"), "none");
      showHideEle($(".other_device"), "none");
    } else if (val == "Other-Device") {
      $(".radiobtnshowhide").removeAttr("name");
      showHideEle($(".iphone"), "none");
      showHideEle($(".samsung"), "none");
      showHideEle($(".other_device"), "block");
      $("#othermodels").attr("name", "phone_model");
    } else if (val == "IPhone") {
      //$(".radiobtnshowhide").removeAttr("name");
      $(".radiobtnshowhide").attr("name", "phone_model");
      showHideEle($(".iphone"), "block");
      showHideEle($(".samsung"), "none");
      showHideEle($(".other_device"), "none");
      $("#othermodels").removeAttr("name"); //,"phone_model")
    } else if (val == "Samsung") {
      //$(".radiobtnshowhide").removeAttr("name");
      $(".radiobtnshowhide").attr("name", "phone_model");
      showHideEle($(".iphone"), "none");
      showHideEle($(".samsung"), "block");
      showHideEle($(".other_device"), "none");
      $("#othermodels").removeAttr("name"); //,"phone_model")
    }
  });
});