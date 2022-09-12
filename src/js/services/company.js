import {
    Api
} from "../models/api.js"


class Company {
    static body = document.querySelector("body")

    static async renderCompanies(list) {
        const admin = localStorage.getItem('@kenzieCompany:Admin')
        const token = localStorage.getItem('@kenzieCompany:token')
        if (!token || admin == "false") {
            this.body.innerHTML = ""
            window.location.assign('../../index.html')
        } else {
        list.forEach(element => {
            this.renderCard(element)
        })
    }
    }

    static async renderCard(element) {
        const ul = document.querySelector(".ulCompany")
        const li = document.createElement('li')
        const name = document.createElement("h3")
        const divSwiper = document.createElement('div')
        const prev = document.createElement("img")
        const next = document.createElement("img")
        const divSwiperWrapper = document.createElement("div")
        const divButtonPrev = document.createElement("div")
        const divButtonNext = document.createElement("div")
        
        let current = 0
        prev.src = "../assets/arrow_back_ios_FILL0_wght400_GRAD0_opsz48.svg"
        next.src = "../assets/arrow_forward_ios_FILL0_wght400_GRAD0_opsz48.svg"
        const listDepartment = await Api.renderDepartment(element.uuid)


        if (listDepartment.data.length == 0) {
            const div = document.createElement('div')
            div.classList.add("swiper-slide")
            const h4 = document.createElement("h4")
            h4.innerText = "Não existe departamentos dentro dessa empresa."
            const p = document.createElement("p")
            p.innerText = `Setor: ${element.sectors.description}`
            prev.src = ""
            next.src = ""
            const pHour = document.createElement("p")
            pHour.innerText = `Horário da empresa: ${element.opening_hours} horas.`

            div.append(h4, pHour, p)
            divSwiperWrapper.append(div)

        } else {
            listDepartment.data.forEach((elementData, index) => {
                const div = document.createElement('div')
                div.classList.add("swiper-slide")
                div.id = `${element.uuid}-${index}`
                const h4 = document.createElement("h4")
                h4.innerText = `Departamento: ${elementData.name}`
                const p = document.createElement("p")
                const p2 = document.createElement("p")
                p2.innerText = `Setor: ${element.sectors.description}`
                p.innerText = elementData.description
                const pHour = document.createElement("p")
                pHour.innerText = `Horário do departamento: ${elementData.companies.opening_hours} horas.`

                div.append(h4, pHour, p, p2)
                divSwiperWrapper.append(div)
                div.style.opacity = index !== 0 ? '0' : '1'
            })

        }

        divButtonNext.addEventListener('click', (e) => {
            if (current < listDepartment.data.length - 1) {
                const currentElement = document.getElementById(`${element.uuid}-${current}`)
                currentElement.style.opacity = '0'
                current++
                const nextElement = document.getElementById(`${element.uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        divButtonPrev.addEventListener('click', (e) => {
            if (current > 0) {
                const currentElement = document.getElementById(`${element.uuid}-${current}`)
                currentElement.style.opacity = '0'
                current--
                const nextElement = document.getElementById(`${element.uuid}-${current}`)
                nextElement.style.opacity = '1'
            }
        })

        name.innerText = element.name
        divSwiper.classList.add("swiper")
        divSwiperWrapper.classList.add("swiper-wrapper")
        divButtonPrev.classList.add("swiper-button-prev")
        divButtonNext.classList.add("swiper-button-next")

        divButtonPrev.append(prev)
        divButtonNext.append(next)
        divSwiper.append(divButtonPrev, divSwiperWrapper, divButtonNext)
        li.append(name, divSwiper)
        ul.appendChild(li)
    }

    static async renderCompaniesSector() {
        const list = await Api.sectores()
        list.data.forEach(element => {
            this.sectores(element)
        })
    }

    static async sectores(element) {
        const sectorCompany = document.getElementById("sectorCompany")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.description
        option.value = element.uuid
        sectorCompany.appendChild(option)


    }

    static createCompany() {
        const inputName = document.getElementById('nameCompany')
        const inputHour = document.getElementById('hourCompany')
        const inpuCompany = document.getElementById('descriptionCompany')
        const inputOption = document.getElementById("sectorCompany")
        const btnResgistration = document.getElementById('buttonCompany')


        btnResgistration.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                "name": inputName.value,
                "opening_hours": inputHour.value,
                "description": inpuCompany.value,
                "sector_uuid": inputOption.value,
            }

            Api.resgistrationCompany(data)

        });
    }

    static async searchCompany() {
        const buttonSearch = document.getElementById("buttonSearch")
        const searchCompany = document.getElementById("searchCompany")
        const ul = document.getElementById("ulDashbord")
        const listApi = await Api.renderCompany()


        buttonSearch.addEventListener("click", (evt) => {
            evt.preventDefault()
            ul.innerHTML = ""
            this.renderCompanies(listApi.filter(element => element.name.toLowerCase().includes(searchCompany.value.toLowerCase()) || element.sectors.description.toLowerCase().includes(searchCompany.value.toLowerCase())))
        })
    }

}

Company.searchCompany()
Company.renderCompaniesSector()
Company.renderCompanies(await Api.renderCompany())
Company.createCompany()