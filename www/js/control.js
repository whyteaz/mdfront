// This is a JavaScript file

function initCarousel(){
        //Init Seach Box Behaviors
        $("#search-cont").on('keyup',function(){filter()})
        $("#search-cont").on('focus',function(){last_active=active;hideallpages();$("#result-box, .padder,.search-input,.home-back-but").show();})
        //$("#search-cont").on('blur',function(){$("#result-box").hide();$(".tilemenu").show();$("#carousel").show()})
        //console.log("Search initiated")
        
        //Reset carousel size
        var h = window.innerHeight-$('.tilemenu').height()-56-ios;
        $("#carousel").height(h)
        
        //Detect swiper for changing active tiles
        document.addEventListener('postchange',function(ev){
        changetile("swipe");
        }) 
        
        //https://onsen.io/v2/docs/guide/js/#gesture-detector
        //Detects based on the element
        var divGD = ons.GestureDetector(document.querySelector('#carousel'));
        divGD.on('dragup', function(event) {
          //console.log('dragup');
          tilemenu('up')
        });
        divGD.on('dragdown', function(event) {
          //console.log('dragdown');
          tilemenu('down')
        });
        
        //Form events
        
        $( "#form" ).submit(function( event ) {
          $("#search-cont").blur()
          event.preventDefault();
        });
        
        //Load the content
        $("#caritem1").show()        
        setTimeout(function(){
        $(".caritem").show()
        },500)
    
        

        }    

//2_0_home.html

var active=0; //Active page
var last_active=0;
var menu_promise=0;//Promise for reloading carousel to the right menu item

function changetile(input){
    //Remove all tile formatting
    $(".tile-but").removeClass("active-tile")
    
    //Set the current active tile
    if(input=="swipe"){
        active=carousel.getActiveIndex();
    }else{
        active=input;
    }
    //Class the active tile
    
    $(".tile"+active).addClass("active-tile")
    //console.log(active)
    
    //Scroll to top
    //$('.caritem').animate({scrollTop:0});
}

function tilemenu(input){
    if(input=="up"){
        //$(".tilemenu").slideUp();
        //$(".find-reward").slideUp();
        //$("#carousel").removeAttr("swipeable");
        //$("#carousel").height(window.innerHeight-56+"px")

    }else{
        //$(".tilemenu").slideDown();
        //$(".find-reward").slideDown();
        //$("#carousel").attr("swipeable",true);
        //$("#carousel").height(window.innerHeight-150+"px")

    }
    
}

function changesearch(input){
var placeholder=""
    if(active==0){
        placeholder="Search";
    }
    if(active==1){
        placeholder="Search Favourites";
    }
    if(active==2){
        placeholder="Search Rewards";
    }
    if(active==3){
        placeholder="Search Directory";
    }
$("#search-cont").attr("placeholder",placeholder)
}


//Search Filter
jQuery.expr[':'].Contains = function(a,i,m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

/*
function filter(input,box){
    var filter = $("#search-cont").val();
    if(filter) {
    $("#result-box").find(".name:not(:Contains(" + filter + "))").parent().parent().parent().parent().hide();
    $("#result-box").find(".name:Contains(" + filter + ")").parent().parent().parent().parent().show();
    } else {
          $("#result-box").find(".name").parent().parent().parent().parent().show();
    }
}*/

function filter(input,box){
    var filter = $(input).val();
    if(filter) {
    $(box).find(".name:not(:Contains(" + filter + "))").parent().parent().parent().parent().hide();
    $(box).find(".name:Contains(" + filter + ")").parent().parent().parent().parent().show();
    } else {
          $(box).find(".name").parent().parent().parent().parent().show();
    }
}

//Home Pages

function showpages(input){
    //Delay to complete animication
    setTimeout(function(){
        //Hide Pages
        hideallpages()
        //Hide Padder
        $(".padder").hide()
        
        $(".home-back-but").show()
        //Show Target Page
        $("#page-"+input).show()
        
    }
    ,400)
}

function hideallpages(){
       $(".home-pages, #carousel, .tilemenu,.home-menu-but,.search-input").hide()
}
    

function backfn(){
    $(".padder").show()
    $(".home-pages").hide()
    $(".home-back-but").hide()
    $("#carousel, .tilemenu,.home-menu-but,.search-input").show()

    //carousel.attr("initial-index",last_active)
    carousel.setActiveIndex(last_active)
    carousel.setActiveIndex(menu_promise)
}

function loadrewfn(){
    console.log("Rewards on")
       // $("#rew-search").on('keyup',function(){filterrew()})
        $("#rew-search").on('keyup',function(){filterrew()})

}

function filterrew(){
    var filter = $("#rew-search").val();

    if(filter) {
    $("#result-box2").find(".name:not(:Contains(" + filter + "))").parent().parent().parent().hide();
    $("#result-box2").find(".name:Contains(" + filter + ")").parent().parent().parent().show();
    } else {
          $("#result-box2").find(".name").parent().parent().parent().show();
    }
}

function filterMall(){
    dragger.setValue(0, 1,false) 
    
    $("#search-mall").on('keyup',function(){filter("#search-mall","#result-mall")})

 }
 
 
 
var map;
function initMap() {
        var location = {lat: 3.119135, lng: 101.674112};
        map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        disableDefaultUI: true,
        center: location
        });
}




    
//Dragger
var dragger;
var cardypos=1;
function drag(){
    $(".red-bar").width($("html").width()+"px")
    $(".red-bar").height(($("html").height()-56)*0.1+"px")
    $("#real-menu").height(($("html").height()-56)+"px")
    $("#real-menu").width($("html").width()+"px")
    $("#store-img-scroll").height(($("html").height()-56)/2+"px")
    $("#menu-wrapper").show();
    dragger=new Dragdealer('content-scroller', {
      horizontal: false,
      vertical: true,
      slide: true,
      y:1,
      steps:3,
      yPrecision: 1,
      animationCallback: function(x, y) {
        //$('.handle').html(y)
        display_title(y);
        cardypos=y;
        backbtnvar=1;
      }
    });
    
}


var stow=1;
function display_title(y){
    var wht=$("html").height()-56-45;
    if(y>=0.5){
    $("#store-img-scroll").css("top",wht*(y-1)+"px");
    }
    if(y>0.95){
        stow=1
    }else{
        stow=0
    }
}





