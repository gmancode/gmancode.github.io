// отобразить кнопку, когда пользователь прокручивает вниз
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// прокрутить страницу до верхней части при нажатии на кнопку
function topFunction() {
  document.body.scrollTop = 0; // для Safari
  document.documentElement.scrollTop = 0; // для Chrome, Firefox, IE и Opera
}
