'use strict'
const Setrule = use('App/Models/Setrule')
const Helpers = use('Helpers')

class SetruleController {

    async index() {
        return await Setrule.all()
    }

    async post({ request, response }) {

        const post = new Setrule()

        const btnImage = request.file('buttonImage', {
            types: ['image'], 
            size: '2mb', 
            fileName: `${new Date().getTime()}.jpg`,
        })
        const soundButton = request.file('soundButton', {
            fileName: `${new Date().getTime()}.jpg`
        })

        await btnImage.move(Helpers.tmpPath('button'), {
            name: `${new Date().getTime()}`,
            overwrite: true
        })

        await soundButton.move(Helpers.tmpPath('sound'), {
            name: `${new Date().getTime()}`,
            overwrite: true
        })

        post.ImageButton = btnImage.fileName
        post.textButton = request.input('textButton')
        post.soundButton = soundButton.fileName

        await post.save()
        return response.redirect('/adminPage')
    }

}

module.exports = SetruleController
