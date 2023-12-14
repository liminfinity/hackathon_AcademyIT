import { validPhone, validName, getBrowserType, createErrorComponent, ErrorControl } from '/js/additional.js';
import { ImageCapture } from '/js/imagecapture.js';
class Registration {
    #video
    #button_reg
    #image
    #stream
    #cancel_button
    #signup_button
    #button_login
    #reg_form
    #user_data = {
        first_name: document.getElementById('first_name'),
        last_name: document.getElementById('last_name'),
        phone_number: document.getElementById('phone')
    }
    constructor() {
        this.#video = document.querySelector('.video');
        this.#video.classList.toggle('hidden')
        this.#button_reg = document.getElementById('make-photo_button');
        this.#cancel_button = document.getElementById('cancel_button');
        this.#signup_button = document.querySelector('.button-reg');
        this.#button_login = document.querySelector('.button-login');
        this.#reg_form = document.getElementById('registration');
        this.#init()
    }
    #init() {
        this.#cancel_button.addEventListener('click', () => {
            this.#closeCamera();
        })
        this.#reg_form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.#validUserData()) {
                const button_cancel = document.querySelector('.signin-face-form_cancel-button')
                const button_makepic = document.querySelector('.signin-face-form_enter-button')
                const form = document.querySelector('.reg-form');
                const make_pic = document.querySelector('.signin-face-form')
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
                this.#openCamera()
            }
            else {
                ErrorControl(document.querySelector('.reg-form'),  createErrorComponent("Неверный формат данных"));
            }
            
        })
        this.#button_login.addEventListener('click', () => {
            this.#goToLogin();
        })
    }
    #validUserData() {
        for (let field in this.#user_data) {
            if (field === 'phone_number') {
                if (!validPhone(this.#user_data[field].value)) {
                    return false;
                }
            }
            else {
                if (!validName(this.#user_data[field].value)) {
                    return false;
                }
            }
        }
        return true;
    }
    async #openCamera() {
        let mediaDevices = navigator.mediaDevices;
        let stream = await mediaDevices.getUserMedia({
            video: true
        })
        this.#stream = stream;
        this.#video.srcObject = stream;
        this.#image = new ImageCapture(stream.getVideoTracks()[0])
        this.#video.addEventListener("loadedmetadata", () => {
            this.#video.classList.remove('hidden')
            this.#video.classList.add('visible')
            this.#video.play();
        });
        this.#button_reg.addEventListener("click", async (e) => {
            e.preventDefault();
            this.#regUser();
        });
    }
    async #regUser() {
        let blob_img = await this.#image.takePhoto();
        let reader = new FileReader()
        reader.readAsArrayBuffer(blob_img);
        reader.addEventListener('load', async () => {
            let view = new Uint8Array(reader.result)
            console.log(view)
            const data = JSON.stringify({
                full_name: this.#user_data["last_name"].value + " " + this.#user_data["first_name"].value,
                phone_number: this.#user_data["phone_number"].value,
                session_info: getBrowserType(),
                photo: view.reduce((result, current) => result + ';' + current, ''),
                about_me: '-'
            })
            let response = await fetch('/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: data
            })
            if (response.message != undefined) {
                ErrorControl(document.querySelector('.video-container'), createErrorComponent(response.message))
            }
            else {
                location.href = "/autorization"
            }
        })
    }
    #closeCamera() {
        this.#stream.getVideoTracks().forEach(track => {
            track.stop()
        })
        this.#video.srcObject = null
        this.#video.classList.add('hidden')
        this.#video.classList.remove('visible')
    }
    #goToLogin() {
        location.href = "/autorization"
    } 
}

const regUser = new Registration()