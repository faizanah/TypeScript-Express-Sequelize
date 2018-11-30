export function initRoutes(app, router) {
  router.get('/', (req, res) => res.status(200).send({message: 'Admin Server is running!'}))
  return router
}
