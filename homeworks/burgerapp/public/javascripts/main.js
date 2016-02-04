var $form = $("#ajax-form");

var onSuccess = function(data, status) {
  $("#result").html(data);
  console.log('sucess'); 
  $.get("ingredients"); 
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  console.log(name); 
  console.log(price); 
  $.post("ingredients", {
    name: name,
    price: price, 
    outOfStock: false
  })
    .done(onSuccess)
    .error(onError);
});

