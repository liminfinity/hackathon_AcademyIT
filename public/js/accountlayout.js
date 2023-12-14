let buttonShowMenu = document.querySelector('.account_settings');
let accountMenu = document.querySelector('.account_menu');
let polygon = document.querySelector('.polygon');

buttonShowMenu.onclick = function() {
  if (accountMenu.style.display == "block"){
    accountMenu.style.display = "none";
    polygon.style.transform = "rotate(0deg)";
  }
  else {
    polygon.style.transform = "rotate(180deg)";
    accountMenu.style.display = "block";
  }
}

