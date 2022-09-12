import {
    Api
} from "../models/api.js";

class dashboardUser {
    static body = document.querySelector("body")

    static authorization() {
        const token = localStorage.getItem('@kenzieCompany:token')
        if (!token) {
            this.body.innerHTML = ""
            window.location.assign('../../index.html')
        } else {
            this.user()
        }

    }

    static async user() {

        const userInformation = await Api.userPage()
        const divInf = document.getElementById("divUser")
        const h2 = document.createElement("h2")
        const nameUser = document.createElement("h3")
        const emailUser = document.createElement("p")
        const levelUser = document.createElement("p")
        const UserModel = document.createElement("p")

        h2.innerText = "Informações Pessoais"
        nameUser.innerText = userInformation.data.username
        levelUser.innerText = `Nível profissional: ${userInformation.data.professional_level }`
        emailUser.innerText = `Email: ${userInformation.data.email}`

        if (userInformation.data.kind_of_work == null) {
            UserModel.innerText = "Sem modelo de trabalho"
        } else {
            UserModel.innerText = `Modelo de trabalho: ${userInformation.data.kind_of_work}`
        }


        divInf.append(h2, nameUser, emailUser, levelUser, UserModel)

    }

    static listDashboardUser() {
        const editName = document.getElementById('editNameUser')
        const editEmail = document.getElementById('editEmail')
        const editPassword = document.getElementById('editPassword')
        const button = document.getElementById('buttonEditUser')

        button.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                "username": editName.value,
                "email": editEmail.value,
                "password": editPassword.value
            }

            Api.editUserInformation(data)

        });

    }


    static async listUserPageDepartment() {
        const listUserRender = await Api.listUserPage()

        const divSwiper = document.createElement('div')
        const prev = document.createElement("img")
        const next = document.createElement("img")
        const li = document.createElement('li')
        const divSwiperWrapper = document.createElement("div")

        const divButtonPrev = document.createElement("div")
        const divButtonNext = document.createElement("div")
        divSwiper.classList.add("swiper")
        divSwiperWrapper.classList.add("swiper-wrapper")
        divButtonPrev.classList.add("swiper-button-prev")
        divButtonNext.classList.add("swiper-button-next")
        divButtonPrev.append(prev)
        divButtonNext.append(next)
        next.src = "../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"
        prev.src = "../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"
        let current = 0

        const ul = document.querySelector(".ulUserDepartment")

        listUserRender.data.forEach((element) => {
            element.users.forEach((user, index) => {
                const div = document.createElement('div')
                const h3 = document.createElement("h3")
                const h4 = document.createElement("h4")


                div.classList.add("swiper-slide")
                h3.innerText = `Nome: ${element.name}`
                h4.innerText = `Descrição: ${element.description}`
                const p = document.createElement("p")
                const p2 = document.createElement("p")
                const p3 = document.createElement("p")
                div.id = `${user.uuid}-${index}`
                p.innerText = `Nome do usuário: ${user.username}`
                p2.innerText = `Email: ${user.email}`
                p3.innerText = `Nível Profissional: ${user.professional_level}`
                div.append(h3, h4, p, p2, p3)
                divSwiperWrapper.append(div)
                div.style.opacity = index !== 0 ? '0' : '1'
                li.append(divSwiper)
                ul.appendChild(li)

            })

        })

        divSwiper.append(divButtonPrev, divSwiperWrapper, divButtonNext)

        divButtonNext.addEventListener('click', () => {
            if (current < listUserRender.data[0].users.length - 1) {
                const currentElement = document.getElementById(`${listUserRender.data[0].users[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current++
                const nextElement = document.getElementById(`${listUserRender.data[0].users[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        divButtonPrev.addEventListener('click', () => {
            if (current > 0) {
                const currentElement = document.getElementById(`${listUserRender.data[0].users[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current--
                const nextElement = document.getElementById(`${listUserRender.data[0].users[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })
    }

    static async departmentUser() {
        const divSwiper = document.createElement('div')
        const prev = document.createElement("img")
        const next = document.createElement("img")
        const divSwiperWrapper = document.createElement("div")
        const divButtonPrev = document.createElement("div")
        const divButtonNext = document.createElement("div")
        const li = document.createElement('li')

        divSwiper.classList.add("swiper")
        divSwiperWrapper.classList.add("swiper-wrapper")
        divButtonPrev.classList.add("swiper-button-prev")
        divButtonNext.classList.add("swiper-button-next")
        divButtonPrev.append(prev)
        divButtonNext.append(next)
        prev.src = "../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"
        next.src = "../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"
        let current = 0


        const listUserRenderPage = await Api.listPage()
        listUserRenderPage.data.departments.forEach((element, index) => {
            const ul = document.querySelector(".ulUserPage")
            const h3 = document.createElement("h3")
            const h4 = document.createElement("h4")
            const div = document.createElement('div')


            div.id = `${element.uuid}-${index}`
            h3.innerText = `Nome: ${element.name}`
            h4.innerText = `Descrição: ${element.description}`
            div.append(h3, h4)
            divSwiperWrapper.append(div)
            div.style.opacity = index !== 0 ? '0' : '1'
            li.append(divSwiper)
            ul.appendChild(li)
            div.classList.add("swiper-slide")
            div.id = `${element.uuid}-${index}`
        })

        divSwiper.append(divButtonPrev, divSwiperWrapper, divButtonNext)

        divButtonNext.addEventListener('click', (e) => {
            if (current < listUserRenderPage.data.departments.length - 1) {
                const currentElement = document.getElementById(`${listUserRenderPage.data.departments[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current++
                const nextElement = document.getElementById(`${listUserRenderPage.data.departments[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        divButtonPrev.addEventListener('click', (e) => {
            if (current > 0) {
                const currentElement = document.getElementById(`${listUserRenderPage.data.departments[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current--
                const nextElement = document.getElementById(`${listUserRenderPage.data.departments[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })
    }
}

dashboardUser.authorization()
dashboardUser.listUserPageDepartment()
dashboardUser.listDashboardUser()
dashboardUser.departmentUser()