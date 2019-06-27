import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.send('Get logged in user')
  })
  .post((req, res) => {
    res.send('Log in User')
  })

export default router
