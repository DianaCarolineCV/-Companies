import {
    Api
} from "../models/api.js"

class Department {
    static body = document.querySelector("body")

    static async renderCompaniesSector() {
        const admin = localStorage.getItem('@kenzieCompany:Admin')
        const token = localStorage.getItem('@kenzieCompany:token')
        if (!token || admin == "false") {
            this.body.innerHTML = ""
            window.location.assign('../../index.html')
        } else {
            const list = await Api.renderCompany()
            list.forEach(element => {
                this.department(element)
            })
        }
    }

    static async department(element) {
        const sectorDepartments = document.getElementById("sectorDepartments")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.name
        option.value = element.uuid
        sectorDepartments.appendChild(option)
    }

    static createDepartments() {
        const inputName = document.getElementById('nameDerpatments')
        const descriptionDepartmentes = document.getElementById('descriptionDepartments')
        const inputOption = document.getElementById("sectorDepartments")
        const btnResgistration = document.getElementById('buttonDepartments')

        btnResgistration.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                "name": inputName.value,
                "description": descriptionDepartmentes.value,
                "company_uuid": inputOption.value,
            }

            Api.resgistrationDepartments(data)

        });
    }

    static async renderDepartment() {
        const listDepartment = await Api.renderDepartmentAll()
        listDepartment.data.forEach(element => {
            this.editDepartments(element)
        })

        const inputOption = document.getElementById("sectorDepartmentsEdit")
        const inputName = document.getElementById('nameDerpatmentsEdit')
        const descriptionDepartmentes = document.getElementById('descriptionDepartmentsEdit')
        const btnResgistration = document.getElementById('buttonDepartmentsEdit')


        inputOption.addEventListener("change", () => {
            const opt = listDepartment.data.filter(dep => dep.name.trim() === inputOption.value.trim())

            console.log(opt)
            descriptionDepartmentes.value = opt[0].description
            inputName.value = opt[0].name
            btnResgistration.id = opt[0].uuid
        })

    }

    static editDepartments(element) {
        const inputOption = document.getElementById("sectorDepartmentsEdit")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.name
        inputOption.appendChild(option)

    }

    static async renderDepartmentDelete() {
        const listDepartment = await Api.renderDepartmentAll()
        listDepartment.data.forEach(element => {
            this.editDepartmentsDelete(element)
        })

        const inputOption = document.getElementById("deleteDepartments")
        const inputName = document.getElementById('nameDerpatmentsDelete')
        const descriptionDepartmentes = document.getElementById('descriptionDepartmentsDelete')
        const btnResgistration = document.getElementById('buttonDepartmentsDelete')


        inputOption.addEventListener("change", () => {
            const opt = listDepartment.data.filter(dep => dep.name.trim() === inputOption.value.trim())
            descriptionDepartmentes.value = opt[0].name
            inputName.value = opt[0].description
            btnResgistration.id = opt[0].uuid
        })

    }

    static editDepartmentsDelete(element) {
        const inputOption = document.getElementById("deleteDepartments")
        const option = document.createElement("option")
        option.classList.add("option")
        option.innerText = element.name
        inputOption.appendChild(option)

    }

    static delete() {
        const btnResgistration = document.getElementById('buttonDepartmentsDelete')

        btnResgistration.addEventListener('click', (event) => {
            event.preventDefault()
            Api.deleteDepartment(btnResgistration.id)

        });

    }
    
    static edit() {
        const btnResgistration = document.getElementById('buttonDepartmentsEdit')
        const descriptionDepartmentes = document.getElementById('descriptionDepartmentsEdit')
        btnResgistration.addEventListener('click', (event) => {
            event.preventDefault()

            const data = {
                "description": descriptionDepartmentes.value,
            }
            Api.editDepartments(data, btnResgistration.id)

        });
    }
}

Department.renderCompaniesSector()
Department.renderDepartment()
Department.renderDepartmentDelete()
Department.createDepartments()
Department.delete()
Department.edit()