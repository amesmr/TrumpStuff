// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
   modal.style.display = "block";
}

// When the user clicks on the button<span> (x), close the modal
span.onclick = function() {
   modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
   if (event.target == modal) {
       modal.style.display = "none";
   }
}
/*var canvas = document.getElementById("myCanvas");
canvas.width = 1000;
canvas.height = 600;
var ctx = canvas.getContext("2d");

var image_1 = load_image("../public/images/white-house-logo.jpg");
var image_2 = load_image("../public/images/trump6.jpg");

function load_image(url) {
    var image = new Image();
    image.src = url;
    image.onload = draw_image;
    return image;
}

function draw_image() {
    ctx.drawImage(image_1, 100,100 );
    ctx.drawImage(image_2, 10,20);
}*/