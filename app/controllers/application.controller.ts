const _ = require('lodash')
import db from '../models/'
let model = ''
class ApplicationController {
  errors: any
  constructor(m) {
    console.log(m)
    model = m
  }
  _create(req, res, options = {}, callback = null) {
    req.getValidationResult()
      .then(function(result) {
        if (result.isEmpty()) {
          req.body = _.pick(_.cloneDeep(req.body), req.pick || [])
          return db[model].create(req.body)
            .then(appuser => res.status(201).send({success: true, data: appuser, message: options['message'] || 'Successfully Created'}))
            .catch(error => res.boom.badRequest(error))
        } else {
          res.boom.badRequest('Validation errors', result.mapped())
        }
      })
  }
  _list(req, res, options = {}, callback = null) {
    return db[model].findAll({ include: [{ all: true }] }).then(data =>
      res.status(200).send({success: true, data: data}))
      .catch(error => res.boom.badRequest(error))
  }
  _findOne(req, res, callback = null) {
    req.getValidationResult().then(function(result) {
        if (result.isEmpty()) {
            db[model].findOne(req.condition || {}).then(data => {
                if (typeof(callback) === 'function')
                  callback(data)
                else
                  res.status(200).send(data)
              }
            ).catch(error => res.boom.badRequest(error))
          } else {
          res.boom.badRequest('Validation errors', result.mapped())
        }
      })
  }
  // _create(req, res, options = {}, callback = null) {
  //   let errors
  //   console.log(JSON.stringify(_.cloneDeep(req.body), null, 2))
  //   req.body = _.pick(_.cloneDeep(req.body), req.pick || [])
  //   if ( errors = req.validationErrors()) {
  //     res.unprocessableEntity(errors)
  //   } else {
  //     const obj = new this.model(req.body)
  //     return obj.save((err, data) => {
  //       if (err && err.code === 11000) {
  //         res.unprocessableEntity(err)
  //       }
  //       if (err) {
  //         console.error(err)
  //         res.unprocessableEntity(err)
  //       }
  //       if (typeof(callback) === 'function') {
  //         callback(data)
  //       } else if (data) {
  //         return res.created(data, {message: (options && options['message']) ? options['message'] : 'Successfully created.'})
  //       }
  //     })
  //   }
  // }

  // _findOrCreateBy(req, res, options = {}, callback = null) {
  //   req.body = _.pick(req.body, req.pick || [])
  //   if ( this.errors = req.validationErrors()) {
  //     res.unprocessableEntity(this.errors)
  //   } else {
  //     this.model.findOne(req.where, (error, data) => {
  //       if (error) {
  //         console.error(error)
  //         res.unprocessableEntity(error)
  //       }
  //       if (!_.isNil(data)) {
  //         if (this.isCallback(callback)) {
  //           callback(data)
  //         } else {
  //           return res.ok(data, {message: (options && options['message']) ? options['message'] : 'Success find.'})
  //         }
  //       } else {
  //         const obj = new this.model(req.body)
  //         return obj.save((err, newData) => {
  //           if (err && err.code === 11000) {
  //             res.unprocessableEntity(err)
  //           }
  //           if (err) {
  //             console.error(err)
  //             res.unprocessableEntity(err)
  //           }
  //           if (this.isCallback(callback)) {
  //             callback(newData)
  //           } else if (newData) {
  //             return res.ok(newData, {message: (options && options['message']) ? options['message'] : 'Successfully created.'})
  //           }
  //         })
  //       }
  //     })
  //   }
  // }
  // _update(req, res, options = {}, callback = null) {
  //   let errors
  //   console.log(JSON.stringify(req.body, null, 2))
  //   req.body = _.pick(req.body, req.pick || [])
  //   if ( errors = req.validationErrors()) {
  //     res.unprocessableEntity(errors)
  //   } else {
  //     this.model.update(req.where, req.body, { new: true }, function(err, data) {
  //       if (err && err.code === 11000) {
  //         res.unprocessableEntity(err)
  //       }
  //       if (err) {
  //         console.error(err)
  //         res.unprocessableEntity(err)
  //       }
  //       if (typeof(callback) === 'function') {
  //         callback(data)
  //       } else if (data) {
  //         return res.ok(data, {message: (options && options['message']) ? options['message'] : 'Successfully Updated.'})
  //       }
  //     })
  //   }
  // }
  // _updateOne(req, res, options = {}, callback = null) {
  //   let errors
  //   console.log(JSON.stringify(req.body, null, 2))
  //   req.body = _.pick(req.body, req.pick || [])
  //   if ( errors = req.validationErrors()) {
  //     res.unprocessableEntity(errors)
  //   } else {
  //     this.model.updateOne(req.where, req.body, function(err, data) {
  //       if (err && err.code === 11000) {
  //         res.unprocessableEntity(err)
  //       }
  //       if (err) {
  //         console.error(err)
  //         res.unprocessableEntity(err)
  //       }
  //       if (typeof(callback) === 'function') {
  //         callback(data)
  //       } else if (data) {
  //         return res.ok(data, {message: (options && options['message']) ? options['message'] : 'Successfully Updated.'})
  //       }
  //     })
  //   }
  // }
  // _find(req, res, options = {}, callback = null) {
  //   let errors
  //   if ( errors = req.validationErrors()) {
  //     res.unprocessableEntity(errors)
  //   } else {
  //     this.model.findOne(req.where, (error, data) => {
  //       if (error) {
  //         console.error(error)
  //         res.unprocessableEntity(error)
  //       }
  //       if (typeof(callback) === 'function') {
  //         callback(data)
  //       } else {
  //         return res.ok(data, {message: (options && options['message']) ? options['message'] : 'Successfully get.'})
  //       }
  //     })
  //   }
  // }
  // _list(req, res, options = {}, callback = null) {
  //   // let list
  //   // this.model.find(req.where || {}).sort(req.sort || {}).then(data => {
  //   //   list = data
  //   //   return data.length
  //   // }).then(count => {
  //   //   if (typeof(callback) === 'function') {
  //   //     callback(count, list)
  //   //   } else {
  //   //     res.ok(list, {message: 'Successfully get the list.', extraData: {count: count}})
  //   //   }
  //   // })
  //   return this.model.findAll({ include: [{ all: true }] }).then(appusers => res.status(200).send(appusers))
  //     .catch(error => res.boom.badRequest(error))
  // }
  private isCallback(cb) {
    return typeof(cb) === 'function'
  }
  private model() {
    return db[model]
  }
}

export default ApplicationController
