import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.send('Get All contacts')
  })
  .post((req, res) => {
    res.send('Add contact')
  })

router.put('/:id', (req, res) => {
  res.send('Add contact')
})

router.delete('/:id', (req, res) => {
  res.send('Add contact')
})

export default router
