import { Router } from 'express'
import { check, validationResult } from 'express-validator'

const router = Router()
const getUserValidations = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters',
  ).isLength({
    min: 6,
  }),
]

router.get('/', [getUserValidations], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  res.send('Get User')
})

router.post('/', (req, res) => {
  res.send('Register User')
})

export default router
