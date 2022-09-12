const token = localStorage.getItem("@kenzieCompany:token")

export const instance = axios.create({
    baseURL: "http://localhost:6278/",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    }
})