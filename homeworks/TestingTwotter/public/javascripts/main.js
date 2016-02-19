var $form = $("#ajax-form");

var highlight = 'highlight'; 


$form.submit(function(event) {
  //Input: event object 
  //Output: None, does call done upon post completition. In done, 
  //prevents the default template in handlebar 
  event.preventDefault();

  //finds the twot on the form
  var twots= $form.find("[name='twot']").val();

  //post request back to server side.js to save twot 
  $.post("twotsfeed/addNewTwot", {
    twot: twots
  })
    .done(function(data, status){ 
      //Input: data and status of post request
      //Output: adds new twot to handlebars template at the top. 
      var string = "<div class = 'divFeed' id =" + data._id + ">" + data.text + "  --" + data.name + " <button type = 'button' class = 'delete' align = 'right'> X </button> </div>"
      $("#feed").prepend(string); 
    })
    .error(function(err){ 
      //Input: error object 
      //Output: if there is an error, logs error object. Else, no output. 
      if(err){ 
        console.log(err); 
      }
    });
});

$('#usersOnTheSide span').on("click", function(event){
  //Input: Event object 
  //Output: none

  event.preventDefault(); 
  //finds the name that was clicked on in the sidebar 
  var chosenName = this.innerText; 

  //goes through each div in the unordered list, feed, to find a div with the same name as the chosenName
  $("ul#feed div").each(function(err, element){ 

    //splitting to find trimmed name
    var firstCut = $.trim(element.innerText.split('--')[1])
    var secondCut = firstCut.split('X')[0]

    //if chosenName equals the current div in the ul, then highlight div in the unordered list
    if($.trim(secondCut) === $.trim(chosenName)){ 
      $(this).addClass('highlight'); 
    }
  })
})

$('#logoutButton').on('click', '.logout', function(event){ 
  //Input: Event object 
  //Output: None conventionally, but does call .done() upon completition of get request
  event.preventDefault(); 
  $.get('/twotsfeed/logout')
    .done(function(status){ 
      //Input: done status 
      //Output: log status 
      console.log(status)
    })
    .error(function(err){ 
      //Input: error object 
      //Output: if there is an error, logs error object. Else, no output. 
      console.log(err); 
    })

})

$('#feed').on('click', '.delete', function(event){ 
  //Input: Event object 
  //Output: none conventially, but does call .done() callback after post request

  //find the tag id of the clicked on twot
  var twotTag = $(this).closest('div')[0];
  var id = twotTag.id;

  //makes post request to remove twot from collection 
  $.post("/twotsfeed/delete", { 
    id: id
  })
  .done(function(){ 
    //Input: --
    //Output: removes the clicked on twot in front of the user
    console.log("in sucess done")
    $('div#'+ id).remove(); 
  })
  .error(function(err){ 
    //Input: Error object 
    //Output: None, only log if error. 
    console.log("Error deleted, error thrown on the clieent side", err)
  })
})

