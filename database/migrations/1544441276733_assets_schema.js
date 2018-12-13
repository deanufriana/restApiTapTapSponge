'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssetsSchema extends Schema {
  up () {
    this.create('assets', (table) => {
      table.increments()
      table.string('mainImage')
      table.string('backgroundColor')
      table.timestamps()
    })
  }

  down () {
    this.drop('assets')
  }
}

module.exports = AssetsSchema
