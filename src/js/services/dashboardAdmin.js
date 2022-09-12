import {
    Api
} from "../models/api.js"

class HomePageAdmin {
    static body = document.querySelector("body")

    static async renderCompanies() {
        const admin = localStorage.getItem('@kenzieCompany:Admin')
        const token = localStorage.getItem('@kenzieCompany:token')
        if (!token || admin == "false") {
            this.body.innerHTML = ""
            window.location.assign('../../index.html')

            console.log(admin)
        } else {
            const list = await Api.sectores()
            list.data.forEach(element => {
                this.sectores(element)
            })
        }
0
    }

    static async sectores(element) {
        const ul = document.getElementById("sectors")
        const li = document.createElement("li")
        const button = document.createElement("button")
        const p = document.createElement("p")


        button.innerText = "Veja mais"
        button.classList.add("buttonSector")
        p.innerText = element.description
        li.append(p, button)
        ul.appendChild(li)

        const compaSector = await Api.companySector(element.description)

        const div = document.createElement('div')
        const divModal = document.createElement('div')
        const divModalHeader = document.createElement('div')
        const divModalBody = document.createElement("div")
        const description = document.createElement("p")
        const buttonModal = document.createElement("button")

        buttonModal.classList.add("modalClose")
        div.classList.add("modalWrapper")
        divModal.classList.add("modal")
        divModalHeader.classList.add("modalHeader")
        divModalBody.classList.add("modalBody")

        buttonModal.innerText = "X"

        button.addEventListener("click", (element) => {
            element.preventDefault()
            div.classList.toggle("show-modal")
            if (compaSector.data.length == 0) {
                description.innerText = "Não existe empresa registrada nesse setor."


                divModalHeader.append(buttonModal)
                divModalBody.append(description)
                divModal.append(divModalHeader, divModalBody)
                div.append(divModal)
                this.body.append(div)

                buttonModal.addEventListener("click", (element) => {
                    element.preventDefault()
                    div.classList.remove("show-modal")
                })

            } else {
                compaSector.data.forEach(elementData => {

                    const table = document.createElement("table")
                    const theader = document.createElement("thead")
                    const tbody = document.createElement("tbody")
                    const tr = document.createElement("tr")
                    const trBody = document.createElement("tr")
                    const th = document.createElement("th")
                    const td = document.createElement("td")
                    const td2 = document.createElement("td")
                    const name = document.createElement("h2")
                    const description = document.createElement("p")
                    const h3 = document.createElement("h3")

                    name.innerText = elementData.name
                    h3.innerText = `Horário de abertura: ${elementData.opening_hours}`
                    description.innerText = `Descrição: ${elementData.description}`


                    td.append(description)
                    td2.append(h3)
                    trBody.append(td2, td)
                    tbody.append(trBody)
                    th.append(name)
                    tr.append(th)
                    theader.append(tr)
                    table.append(theader, tbody)
                    divModalHeader.append(buttonModal)
                    divModalBody.append(table)
                    divModal.append(divModalHeader, divModalBody)
                    div.append(divModal)
                    this.body.append(div)

                    buttonModal.addEventListener("click", (element) => {
                        divModalBody.innerText = ""
                        element.preventDefault()
                        div.classList.remove("show-modal")
                    })
                })
            }
        })

    }

    static async renderUserDashBoard() {
        const listUserRender = await Api.listUser()
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
        prev.src = "../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"
        next.src = "../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"
        let current = 0

        listUserRender.data.forEach((element, index) => {
            const ul = document.querySelector(".ulUser")
            const h3 = document.createElement("h3")
            const h4 = document.createElement("h4")
            const p = document.createElement("p")
            const p2 = document.createElement("p")
            const div = document.createElement('div')
           
            div.classList.add("swiper-slide")
            div.id = `${element.uuid}-${index}`
            h3.innerText = `Nome: ${element.username}`
            h4.innerText = `Email: ${element.email}`
            p.innerText = `Nível profissional: ${element.professional_level}`
            p2.innerText = `Modelo de trabalho: ${element.kind_of_work}`

            div.append(h3, h4, p, p2)
            divSwiperWrapper.append(div)
            div.style.opacity = index !== 0 ? '0' : '1'
            li.append(divSwiper)
            ul.appendChild(li)
        })

        divSwiper.append(divButtonPrev, divSwiperWrapper, divButtonNext)

        divButtonNext.addEventListener('click', (e) => {
            if (current < listUserRender.data.length - 1) {
                const currentElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current++
                const nextElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        divButtonPrev.addEventListener('click', (e) => {
            if (current > 0) {
                const currentElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current--
                const nextElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })
    }

    static async userNoDepartment() {
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
        next.src = "../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"
        prev.src = "../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"
        let current = 0


        const listUserRender = await Api.listUserNoDepartment()

        listUserRender.data.forEach((element, index) => {
            const ul = document.querySelector(".ulUserNoDepartment")
            const h3 = document.createElement("h3")
            const h4 = document.createElement("h4")
            const p = document.createElement("p")
            const p2 = document.createElement("p")
            const div = document.createElement('div')

            h3.innerText = `Nome: ${element.username}`
            h4.innerText = `Email: ${element.email}`
            p.innerText = `Nível profissional: ${element.professional_level}`
            p2.innerText = `Modelo de trabalho: ${element.kind_of_work}`
            div.append(h3, h4, p, p2)
            divSwiperWrapper.append(div)
            div.style.opacity = index !== 0 ? '0' : '1'

            li.append(divSwiper)
            ul.appendChild(li)
            div.classList.add("swiper-slide")
            div.id = `${element.uuid}-${index}`
        })

        divSwiper.append(divButtonPrev, divSwiperWrapper, divButtonNext)

        divButtonNext.addEventListener('click', (e) => {
            if (current < listUserRender.data.length - 1) {
                const currentElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current++
                const nextElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        divButtonPrev.addEventListener('click', (e) => {
            if (current > 0) {
                const currentElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                currentElement.style.opacity = '0'
                current--
                const nextElement = document.getElementById(`${listUserRender.data[current].uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })
    }


    static async renderUser() {
        const listUserRender = await Api.listUserNoDepartment()
        listUserRender.data.forEach((element) => {
            this.userAll(element)
        })
    }

    static async userAll(element) {
        const sectorUser = document.getElementById("renderUser")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.username
        option.value = element.uuid
        sectorUser.appendChild(option)

    }

    static async renderUserUpdate() {
        const listUserRender = await Api.listUser()
        listUserRender.data.forEach((element) => {
            this.userUpdate(element)
            this.deleteUser(element)
            this.dismissUser(element)
        })
    }

    static async userUpdate(element) {
        const sectorUser = document.getElementById("editUser")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.username
        option.value = element.uuid
        sectorUser.appendChild(option)

    }

    static update() {
        const id = document.getElementById("editUser")
        const model = document.getElementById("editModel")
        const professionalLevel = document.getElementById("professionalLevel")
        const buttonModel = document.getElementById("buttonModel")

        buttonModel.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                kind_of_work: model.value,
                professional_level: professionalLevel.value
            }

            Api.updateUser(data, id.value)

        });
    }

    static async renderDepartmentUserAll() {
        const listDepartment = await Api.renderDepartmentAll()
        listDepartment.data.forEach(element => {
            this.renderDepartmentsUser(element)

        })

    }

    static renderDepartmentsUser(element) {
        const sectorUser = document.getElementById("renderUserSelect")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.name
        option.value = element.uuid
        sectorUser.appendChild(option)
    }


    static hire() {
        const id = document.getElementById("renderUser")
        const idDepartment = document.getElementById("renderUserSelect")
        const buttonUser = document.getElementById("buttonUser")

        buttonUser.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                user_uuid: id.value,
                department_uuid: idDepartment.value
            }

            Api.resgistrationUser(data)

        });
    }

    static dismissUser(element) {
        const sectorUser = document.getElementById("deleteUser")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.username
        option.value = element.uuid
        sectorUser.appendChild(option)
    }

    static deleteUser(element) {
        const sectorUser = document.getElementById("deleteUserPage")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.username
        option.value = element.uuid
        sectorUser.appendChild(option)
    }

    static dismissUserDashboard() {
        const id = document.getElementById("deleteUser")
        const buttonUser = document.getElementById("buttonDeleteUser")

        buttonUser.addEventListener('click', (event) => {
            event.preventDefault()

            Api.dismissUser(id.value)

        });
    }

    static deleteUserDashboard() {
        const id = document.getElementById("deleteUserPage")
        const buttonUser = document.getElementById("buttonDeleteUserPage")

        buttonUser.addEventListener('click', (event) => {
            event.preventDefault()

            Api.deleteUser(id.value)

        });
    }

}

HomePageAdmin.renderCompanies()
HomePageAdmin.renderUserDashBoard()
HomePageAdmin.userNoDepartment()
HomePageAdmin.renderUser()
HomePageAdmin.renderUserUpdate()
HomePageAdmin.update()
HomePageAdmin.renderDepartmentUserAll()
HomePageAdmin.hire()
HomePageAdmin.dismissUserDashboard()
HomePageAdmin.deleteUserDashboard()