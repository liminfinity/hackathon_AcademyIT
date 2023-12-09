import { historyControl } from "./additional.js";

class Account {
    #container
    #user_name
    constructor() {
        this.#container = document.querySelector('.entry-history-list');
        this.#user_name = document.querySelector('.account_settings p')
    }

    async getData() {
        console.log(1)
        let response = await fetch('/account/data');
        response = await response.json()
        this.dataLayout(response)
    }
    dataLayout(data) {
        this.#user_name.innerHTML = data.name
        historyControl(this.#container, data.array.slice(1, data.array.length - 1).split('&').reverse())
    }

}
let account = new Account();
account.getData();