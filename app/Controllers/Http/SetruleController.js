'use strict'
const Setrule = use('App/Models/Setrule')
const Helpers = use('Helpers')
const CloudinaryService = use('App/Services/CloudinaryService')

class SetruleController {

    async index() {
        return await Setrule.all()
    }

    /*     async mainImage({ request, response, session }) {
            const file = request.file('mainImage');
            try {
                const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, { folder: 'postsapp' });
                const post = await Assets.find(1);
                post.mainImage = cloudinaryResponse.secure_url;
                await post.save();
                session.flash({ success: 'Successfully added post' });
                return response.redirect('back');
            } catch (e) {
                session.flash({ error: 'Error Uploading Image' });
                return response.redirect('/')
            }
        } */

    async post({ request, response, session }) {

        const ImageButton = request.file('buttonImage', {
            types: ['image'],
            size: '2mb',
            fileName: `${new Date().getTime()}.jpg`,
        })
        const soundButton = request.file('soundButton')

        try {

            const buttonResponse = await CloudinaryService.v2.uploader.upload(ImageButton.tmpPath, { folder: 'imageButton' });

            const soundResponse = await CloudinaryService.v2.uploader.upload(soundButton.tmpPath, { folder: 'soundButton', resource_type: 'video', });

            const post = new Setrule()
            post.ImageButton = buttonResponse.secure_url;
            post.soundButton = soundResponse.secure_url;
            post.textButton = request.input('textButton')

            await post.save();

            session.flash({ success: 'Successfully added post' });

            return response.redirect('back');
        } catch (e) {
            session.flash({ error: 'Error Uploading Image' });
            console.log(e)
            return response.redirect('/')
        }
    }

}

module.exports = SetruleController
