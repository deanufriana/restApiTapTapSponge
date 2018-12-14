'use strict'
const Assets = use('App/Models/Asset')
const Helpers = use('Helpers')
const CloudinaryService = use('App/Services/CloudinaryService');

class AssetController {

    async index() {
        return await Assets.all()
    }

    async mainImage({ request, response, session }) {
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
    }

    async backgroundColor({ request, response }) {
        const post = await Assets.find(1);
        post.backgroundColor = request.input('backgroundColor')
        await post.save()
        return response.redirect('/adminPage')
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
    }

    async ruleGame({ request, response }) {
        const post = await Assets.find(1)
        post.setRule = request.input('ruleGame')
        await post.save()
        return response.redirect('/adminPage')
    } */
}

module.exports = AssetController
