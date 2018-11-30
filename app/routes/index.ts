import { Express, Request, Response } from 'express'
import * as subdomain  from 'express-subdomain'
import * as apiRoutes from './api.routes'
import * as adminRoutes from './admin.routes'
import * as express from 'express'
export function initRoutes(app: Express) {
  app.use(subdomain('api', apiRoutes.initRoutes(app, express.Router())))
  app.use(subdomain('admin', adminRoutes.initRoutes(app, express.Router())))
  app.get('/', (req, res) => res.status(200).send({message: 'Welcome to IMFO world'}))
  app.all('*', (req: Request, res: Response) => res.boom.notFound())
}
