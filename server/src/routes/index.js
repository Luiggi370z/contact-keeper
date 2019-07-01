import { Router } from 'express'

import usersRoutes from './users'
import contactsRoutes from './contacts'
import authRoutes from './auth'
import auth from '../middleware/auth'

const router = Router()

router.use('/users', usersRoutes)
router.use('/contacts', auth, contactsRoutes)
router.use('/auth', authRoutes)

export default router
