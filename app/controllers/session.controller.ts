import { ApplicationController } from './'
export class SessionController extends ApplicationController {
  constructor() {
    super('User')
  }
  login(req, res) {
    req.checkBody('email', 'Enter a valid email address.').isEmail().isLength({ min: 3 , max: 100 })
    req.checkBody('password', 'Password should be at least 6 chars long.').isLength({ min: 6 })
    req.condition = {where: {email: req.body.email}}
    return super._findOne(req , res,  data => {
      if (data.authenticate(req.body.password))
        return res.status(200).send({success: true, data: data, token: data.generateToken(), message: 'Congrats! You have Successfully login'})
      else
        return res.status(401).send({success: false, errors: [{message: 'Authentication failed. Wrong Password or email.'}]})
    })
  }
}
