class LogoutPage {
    static logout() {
        const btnLogout = document.getElementById("logout")

        btnLogout.addEventListener("click", (event) => {
            event.preventDefault()
            window.location.assign('../../index.html')
            localStorage.clear("@kenzieCompany:token")

        })
    }
}

LogoutPage.logout()