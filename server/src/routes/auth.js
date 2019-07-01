import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import { User } from '../models/User'
import auth from '../middleware/auth'

const router = Router()

const authValidations = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
]

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // We don't want to return the password
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', authValidations, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'User not found!' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

    const payload = {
      user: { id: user.id },
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600000,
      },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      },
    )
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server error')
  }
})

export default router
