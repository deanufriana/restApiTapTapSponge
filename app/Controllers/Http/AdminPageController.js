'use strict'
const AdminPage = use('App/Models/Admin')

class AdminPageController {

    async index() {
        return await AdminPage.all()
    }

    async store({ request, response }) {
        const body = request.all()
        const data = await AdminPage.create({
            ...body,
        })
        response.send({
            message: "success",
            data
        })
    }
}

module.exports = AdminPageController
