import { ImageCapture } from '/js/imagecapture.js';

class Autorization {
    #video
    #btn_login
    #image
    constructor() {
        this.#video = document.querySelector('.video');
        this.#btn_login = document.getElementById('make-photo_button');
        
    }
    async openCamera() {
        let mediaDevices = navigator.mediaDevices;
        let stream = await mediaDevices.getUserMedia({
            video: true
        })
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
        let response = await fetch('/autorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({"blob_img": blob_img.toString()})
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
}
const login = new Autorization();
login.openCamera();

