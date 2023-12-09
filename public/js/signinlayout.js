let buttonSignIn = document.getElementById('signin_button');
let buttonCancel = document.getElementById('cancel_button');
let signInFaceFrom = document.querySelector('.signin-face-form');
let signInEntry = document.querySelector('.signin-entry');
let content = document.querySelector('.content');

buttonSignIn.onclick = function() {
  signInEntry.classList.remove('un-faded');
  signInEntry.classList.add('faded');
  setTimeout(Hide, 350)
}

buttonCancel.onclick = function() {
  signInEntry.classList.remove('faded');
  signInEntry.classList.add('un-faded');
  setTimeout(Show, 350)
}

function Hide() {
  content.style.display = "flex";
  signInEntry.style.display = "none";
}

function Show() {
  content.style.display = "grid";
  signInEntry.style.display = "flex";
}