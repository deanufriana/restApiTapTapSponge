'use strict'
const Setrule = use('App/Models/Setrule')
const CloudinaryService = use('App/Services/CloudinaryService')

class SetruleController {

    async index() {
        return await Setrule.all()
    }

    async post({ request, response, session }) {

        const soundButton = request.file('soundButton')
        
        try {

            const soundResponse = await CloudinaryService.v2.uploader.upload(soundButton.tmpPath, { folder: 'soundButton', resource_type: 'video', });

            const post = new Setrule()

            post.soundButton = soundResponse.secure_url;
            post.textButton = request.input('textButton')
            post.buttonColor = request.input('buttonColor')

            await post.save();

            session.flash({ notification: 'set Asset Button Berhasil' });

            return response.redirect('back');
        } catch (e) {
            session.flash({ notification: 'Gagal Asset Button' });
            console.log(e)
            return response.redirect('back')
        }
    }

}

module.exports = SetruleController
