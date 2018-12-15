'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.on('/adminPage').render('adminPage')

Route.get('/api/setrule', 'SetruleController.index')
Route.post('/post/setrule', 'SetruleController.post')

Route.get('/api/adminPage', 'AdminPageController')


Route.get('/api/asset', 'AssetController.index')

Route.post('/post/background', 'AssetController.backgroundImage')

Route.post('/post/mainImage', 'AssetController.mainImage')
Route.post('/post/ruleGame', 'AssetController.ruleGame')