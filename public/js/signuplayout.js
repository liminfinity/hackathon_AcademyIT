const button_login = document.querySelector('.button-login')
const button_reg = document.querySelector('.button-reg')
const button_cancel = document.querySelector('.signin-face-form_cancel-button')
const button_makepic = document.querySelector('.signin-face-form_enter-button')
const form = document.querySelector('.reg-form');
const make_pic = document.querySelector('.signin-face-form')

button_reg.onclick = () => {
   form.classList.add('form-hidden')
   make_pic.classList.add('make-pic-visible')

   form.classList.remove('form-visible')
   make_pic.classList.remove('make-pic-hidden')

   button_cancel.classList.remove('make-button-hidden')
   button_makepic.classList.remove('make-button-hidden')
   button_cancel.classList.add('make-button-visible')
   button_makepic.classList.add('make-button-visible')
   setTimeout(() => {
      button_cancel.style.opacity = 1;
      button_makepic.style.opacity = 1;
   }, 490);
}

button_cancel.onclick = () => {
   form.classList.remove('form-hidden')
   form.classList.add('form-visible')

   button_cancel.classList.remove('make-button-visible')
   button_makepic.classList.remove('make-button-visible')
   button_cancel.classList.add('make-button-hidden')
   button_makepic.classList.add('make-button-hidden')

   setTimeout(() => {
      button_cancel.style.opacity = 0;
      button_makepic.style.opacity = 0;
   }, 490);

   setTimeout(() => {
      make_pic.classList.remove('make-pic-visible')
      make_pic.classList.add('make-pic-hidden')
   }, 300);
}