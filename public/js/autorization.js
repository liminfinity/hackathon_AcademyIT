import { ImageCapture } from '/js/imagecapture.js';
import { getBrowserType, createErrorComponent, ErrorControl } from './additional.js';

class Autorization {
    #video
    #btn_login
    #image
    #stream
    #signin
    #cancel_button
    #signup_button
    constructor() {
        this.#video = document.querySelector('.video');
        this.#btn_login = document.getElementById('make-photo_button');
        this.#signin = document.getElementById('signin_button');
        this.#cancel_button = document.getElementById('cancel_button');
        this.#signup_button = document.getElementById('signup_button');
        this.#init()
    }
    #init() {
        this.#signin.addEventListener('click', () => {
            this.#openCamera();
        })
        this.#cancel_button.addEventListener('click', () => {
            this.#closeCamera();
        })
        this.#signup_button.addEventListener('click', () => {
            this.#goToRegistration()
        })
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
            this.#video.play();
        });
        this.#btn_login.addEventListener("click", async (e) => {
            e.preventDefault();
            this.#loginUser();
        });
    }
    async #loginUser() {
        let blob_img = await this.#image.takePhoto();
        let reader = new FileReader()
        reader.readAsArrayBuffer(blob_img);
        reader.addEventListener('load', async () => {
            let view = new Uint8Array(reader.result)
            console.log(view)
            const data = JSON.stringify({
                session_info: getBrowserType(),
                photo: view.reduce((result, current) => result + ';' + current, ''),
            })
            console.log(data)
            let response = await fetch('/autorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: data
            })
            response = await response.json();
            if (response.message != undefined) {
                ErrorControl(document.querySelector('.video-container'), createErrorComponent(response.message))
            }
            else {
                location.href = "/account"
            }
            
        })

        /* let blob_img = await this.#image.takePhoto();
        let reader = new FileReader();
        reader.readAsArrayBuffer(blob_img);
        reader.addEventListener('load', async () => {
            let response = await fetch('/autorization', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"blob_img": reader.result.toString()})
            })
        }) */
    }
    #closeCamera() {
        this.#stream.getVideoTracks().forEach(track => {
            track.stop()
        })
        this.#video.srcObject = null
    }
    #goToRegistration() {
        location.href = "/registration"
    }        
}
const login = new Autorization();

