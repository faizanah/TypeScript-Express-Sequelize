import { ApplicationController } from './'
export class UsersController extends ApplicationController {
  constructor() {
    super('User')
  }
  list(req, res) {
    return super._list(req, res)
  }
}
