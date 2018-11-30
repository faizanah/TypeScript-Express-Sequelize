export function initRoutes(app, router) {
  router.get('/', (req, res) => res.status(200).send({message: 'Welcome to IMFO world'}))
  return router
}
