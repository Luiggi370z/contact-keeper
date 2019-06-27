import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('Register User')
})

router.post('/', (req, res) => {
  res.send('Register User')
})

export default router
