import {
  instance
} from "./axios.js"
import {
  Toast
} from "./toast.js"

export class Api {
  static async renderCompany() {
    const company = await instance
      .get("/companies")
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return company
  }


  static async login(data) {
    const user = await instance
      .post("auth/login", data)
      .then((resp) => {
        localStorage.setItem("@kenzieCompany:token", resp.data.token);
        localStorage.setItem("@kenzieCompany:userId", resp.data.uuid);
        localStorage.setItem("@kenzieCompany:Admin", resp.data.is_admin);

        if (resp.data.token && resp.data.token != undefined && resp.data.is_admin == false) {
          Toast.create("login realizado com sucesso", "green");
          console.log(resp);
          setTimeout(() => {
            window.location.replace("src/pages/dashboardUser.html");
          }, 900);

        } else if (resp.data.token && resp.data.token != undefined && resp.data.is_admin == true) {
          Toast.create("login realizado com sucesso", "green");
          console.log(resp);
          setTimeout(() => {
            window.location.replace("src/pages/dashboardAdmin.html");
          }, 900);
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return user
  }

  static async userPage() {
    const user = await instance
      .get("users/profile")
      .then((resp) => {
        const id = localStorage.getItem("@kenzieCompany:userId");
        if (resp.data.uuid == id) {
          return resp
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return user
  }

  static async resgistration(data) {
    const user = await instance
      .post("auth/register/user", data)
      .then(() => {
        Toast.create("Cadastro realizado com sucesso", "green");
        setTimeout(() => {
          window.location.assign('../../../index.html')
        }, 600)

      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return user
  }

  static async sectores() {
    const sector = await instance
      .get("sectors")
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })


    return sector
  }

  static async companySector(company) {
    const sector = await instance
      .get(`companies/${company}`)
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return sector
  }

  static async renderDepartmentAll() {
    const departments = await instance
      .get(`departments`)
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return departments
  }

  static async renderDepartment(id) {
    const departments = await instance
      .get(`departments/${id}`)
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return departments
  }

  static async resgistrationCompany(data) {
    const resgistration = await instance
      .post("companies", data)
      .then(() => {
        Toast.create("Cadastro realizado com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)

      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return resgistration
  }

  static async resgistrationDepartments(data) {
    const resgistration = await instance
      .post("departments", data)
      .then(() => {
        Toast.create("Cadastro realizado com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)

      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return resgistration

  }

  static async editDepartments(data, id) {
    const departments = await instance
      .patch(`departments/${id}`, data)
      .then(() => {
        Toast.create("Edição realizada com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });
    return departments
  }

  static async deleteDepartment(id) {
    const departments = await instance
      .delete(`departments/${id}`)
      .then(() => {
        Toast.create("Departamento deletado com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });
    return departments
  }

  static async listUser() {
    const user = await instance
      .get("users")
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })

    return user
  }

  static async listUserNoDepartment() {
    const user = await instance
      .get("admin/out_of_work")
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })

    return user
  }

  static async resgistrationUser(data) {
    const resgistration = await instance
      .patch("departments/hire/", data)
      .then(() => {
        Toast.create("Cadastro realizado com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)

      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });

    return resgistration
  }

  static async updateUser(data, id) {
    const user = await instance
      .patch(`admin/update_user/${id}`, data)
      .then(() => {
        Toast.create("Atualização realizada com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });
    return user
  }

  static async dismissUser(id) {
    const user = await instance
      .patch(`departments/dismiss/${id}`)
      .then(() => {
        Toast.create("Funcionário demitido com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })

    return user
  }

  static async deleteUser(id) {
    const user = await instance
      .delete(`admin/delete_user/${id}`)
      .then(() => {
        Toast.create("Funcionário deletado com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })

    return user
  }

  static async editUserInformation(data) {
    const user = await instance
      .patch(`users`, data)
      .then(() => {
        Toast.create("Atualização realizada com sucesso", "green");
        setTimeout(() => {
          window.location.reload()
        }, 600)
      })
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      });
    return user
  }

  static async listUserPage() {
    const user = await instance
      .get("users/departments/coworkers")
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })
    return user
  }

  static async listPage() {
    const user = await instance
      .get("users/departments")
      .catch((err) => {
        console.log(err);
        Toast.create(err.response.data.error, "#ff0000");
      })
    return user
  }


}