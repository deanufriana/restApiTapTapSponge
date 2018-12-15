'use strict'
const Assets = use('App/Models/Asset')
const Helpers = use('Helpers')
const CloudinaryService = use('App/Services/CloudinaryService');

class AssetController {

    async form({ response }) {
        return response.redirect('/form')
    }

    async index() {
        return await Assets.find(1)
    }

    async mainImage({ request, response, session }) {
        const file = request.file('mainImage');
        try {

            const cloudinaryResponse = await CloudinaryService.v2.uploader.upload(file.tmpPath, { folder: 'postsapp' });

            const post = await Assets.find(1);
            post.mainImage = cloudinaryResponse.secure_url;

            await post.save();

            session.flash({ notification: 'Image Utama Berhasil di Upload' });

            return response.redirect('back');
        } catch (e) {
            console.log(e)
            session.flash({ notification: 'Gagal Upload Image' });

            return response.redirect('back')
        }
    }

    async backgroundImage({ request, response, session }) {

        const backgroundImage = request.file('backgroundImage', {
            fileName: `background.jpg`,
        })
        
        try {

            const backgroundResponse = await CloudinaryService.v2.uploader.upload(backgroundImage.tmpPath, { folder: 'backgroundImage' });

            const post = await Assets.find(1);
            post.backgroundImage = backgroundResponse.secure_url;

            await post.save()
            session.flash({ notification: 'Berhasil Mengupload Background Image' });
            return response.redirect('back')
 
        } catch (e) {
            session.flash({ notification: 'Error Uploading Image' });
            console.log(e)
        }
    }

    /*  async mainImage({ request, response }) {
         const post = await Assets.find(1)
 
         const Image = request.file('mainImage', {
             types: ['image'],
             size: '2mb',
             fileName: 'mainImage.jpg',
         })
 
         await Image.move(Helpers.tmpPath('assets'), {
             name: 'mainImage.jpg',
             overwrite: true
         })
 
         if (!Image.moved()) {
             return Image.error()
         }
 
         post.mainImage = Image.fileName
         await post.save()
         return response.redirect('/adminPage')
     } */

    async ruleGame({ request, response, session }) {
        const post = await Assets.find(1)
        post.setRule = request.input('ruleGame')
        await post.save()
        session.flash({ notification: 'Rule Game Berhasil di set' });
        return response.redirect('/adminPage')
    }
}

module.exports = AssetController
