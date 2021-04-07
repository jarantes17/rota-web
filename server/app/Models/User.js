'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  static get traits() {
    return ['@provider:Adonis/Acl/HasRole']
  }

  static get hidden() {
    return ['password', 'role_id', 'provider_id', 'provider']
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
