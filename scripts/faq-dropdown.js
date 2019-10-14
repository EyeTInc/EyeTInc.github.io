document.addEventListener("DOMContentLoaded", function(event){
    var acc=document.getElementsByClassName("accordion");
    for(var i=0; i<acc.length; i++){
        acc[i].onclick=function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
});