const button_login = document.querySelector('.button-login')
const reg_form = document.querySelector('#registration')
const button_cancel = document.querySelector('.signin-face-form_cancel-button')
const button_makepic = document.querySelector('.signin-face-form_enter-button')
const form = document.querySelector('.reg-form');
const make_pic = document.querySelector('.signin-face-form')


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