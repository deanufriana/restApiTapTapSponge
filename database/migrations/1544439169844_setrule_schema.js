'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SetruleSchema extends Schema {
  up () {
    this.create('setrules', (table) => {
      table.increments()
      table.string('imageButton')
      table.string('textButton')
      table.string('soundButton')
      table.string('set')
      table.timestamps()
    })
  }

  down () {
    this.drop('setrules')
  }
}

module.exports = SetruleSchema
