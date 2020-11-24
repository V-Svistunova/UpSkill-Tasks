// header menu

$(document).ready(function() {
  $(`.header_burger`).click(function(event) {
    $(`.header_burger,.header_menu,.header_logo`).toggleClass(`active`);
    $(`body,.main`).toggleClass(`lock`);    
  });
  $(`.header_menu`).click(function(event) {
    $(`.header_burger,.header_menu,.header_logo`).removeClass(`active`);
    $(`body,.main`).removeClass(`lock`);   
  });
});


// header menu avtive

$(document).ready(function() {
    $(`.header_link-1`).click(function(event) {
      $(`.header_link-1`).addClass(`active`);
      $(`.header_link-2,.header_link-3,.header_link-4,.header_link-5`).removeClass(`active`);    
    }); 
});

$(document).ready(function() {  
  $(`.header_link-2`).click(function(event) {
    $(`.header_link-2`).addClass(`active`);
    $(`.header_link-1,.header_link-3,.header_link-4,.header_link-5`).removeClass(`active`);    
  });  
});

$(document).ready(function() {  
  $(`.header_link-3`).click(function(event) {
    $(`.header_link-3`).addClass(`active`);
    $(`.header_link-2,.header_link-1,.header_link-4,.header_link-5`).removeClass(`active`);    
  });  
});

$(document).ready(function() {  
  $(`.header_link-4`).click(function(event) {
    $(`.header_link-4`).addClass(`active`);
    $(`.header_link-2,.header_link-3,.header_link-1,.header_link-5`).removeClass(`active`);    
  });  
});

$(document).ready(function() {  
  $(`.header_link-5`).click(function(event) {
    $(`.header_link-5`).addClass(`active`);
    $(`.header_link-2,.header_link-3,.header_link-4,.header_link-1`).removeClass(`active`);    
  });  
});


// slow transition

 $(document).ready(function(){
    $("#header_menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 2000);
    });
});



// Slider intro

$(document).ready(function(){
  $(`.slider`).slick();
});


// portfolio menu active

$(document).ready(function() {
  $(`.places_active-1`).click(function(event) {
    $(`.places_active-1`).addClass(`active`);
    $(`.places_active-2,.places_active-3,.places_active-4`).removeClass(`active`);    
  }); 
});

$(document).ready(function() {
  $(`.places_active-2`).click(function(event) {
    $(`.places_active-2`).addClass(`active`);
    $(`.places_active-1,.places_active-3,.places_active-4`).removeClass(`active`);    
  }); 
});

$(document).ready(function() {
  $(`.places_active-3`).click(function(event) {
    $(`.places_active-3`).addClass(`active`);
    $(`.places_active-2,.places_active-1,.places_active-4`).removeClass(`active`);    
  }); 
});

$(document).ready(function() {
  $(`.places_active-4`).click(function(event) {
    $(`.places_active-4`).addClass(`active`);
    $(`.places_active-2,.places_active-3,.places_active-1`).removeClass(`active`);    
  }); 
});




// portfolio_cards random

$(document).ready(function() {
  $(`.places_item`).click(function(event) {
    $(function(){
      var $divs = $('.places_cards div');
      var arr = [];
      $divs.each(function(){
        arr.push($(this).detach());
      });
        arr.sort(function(a, b){
        return Math.random() - 0.5;
      });
      for (var index in arr) {
        $('.places_cards').append(arr[index]);
      }
    });  
  });
});




