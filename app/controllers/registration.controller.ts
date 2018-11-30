import { ApplicationController } from './'
export class RegistrationController extends ApplicationController {
  constructor() {
    super('User')
  }
  signup(req, res) {
    req.checkBody('email', 'Enter a valid email address.').isEmail().isLength({ min: 3 , max: 100 })
    req.checkBody('firstName', 'First Name must be between 2 and 50 characters in length.').isLength({ min: 2 , max: 50 })
    req.checkBody('lastName', 'Last Name must be between 2 and 50 characters in length.').isLength({ min: 2 , max: 50 })
    req.checkBody('password', 'Password should be at least 6 chars long.').isLength({ min: 6 })
    req.pick = ['email', 'firstName', 'lastName', 'password' ]
    return super._create(req , res, {message: 'Congrats! You have successfully registered'} )
  }
}
