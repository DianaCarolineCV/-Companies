import {
    Api
} from "./models/api.js";


export class Index {

    static renderLogin () {
        const emailLogin = document.getElementById("emailLogin")
        const passwordLogin = document.getElementById("passwordLogin")
        const btnLogin = document.getElementById("btnLogin")

        btnLogin.addEventListener("click", (event) => {
            event.preventDefault()

            const body = {
                email: emailLogin.value,
                password: passwordLogin.value
            }
          
            Api.login(body)
        })
    }

    static async renderCompanies() {
        const list = await Api.renderCompany()
        list.forEach(element => {
            this.renderCard(element)
        })
    }

    static renderCard(element) {
        const ul = document.querySelector(".ulCompany")
        const li = document.createElement('li')
        const name = document.createElement("h3")
        const sector = document.createElement("span")

        name.innerText = element.name
        sector.innerText =  `Setor: ${element.sectors.description}` 


        li.append(name, sector)
        ul.appendChild(li)
    }

}

Index.renderCompanies()
Index.renderLogin()

