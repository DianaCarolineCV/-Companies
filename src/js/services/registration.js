import {
    Api
} from "../models/api.js";
export class Registration {

    static createUser() {
        const inputName = document.getElementById('nameRegistration')
        const inputEmail = document.getElementById('emailRegistration')
        const inputPassword = document.getElementById('passwordResgistration')
        const inputWork = document.getElementById('workResgistration')
        const btnResgistration = document.querySelector('#btnResgistration')


        btnResgistration.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                password: inputPassword.value,
                email: inputEmail.value,
                professional_level: inputWork.value,
                username: inputName.value,
            }

            Api.resgistration(data)

        });
    }
}


Registration.createUser()