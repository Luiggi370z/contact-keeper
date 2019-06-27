import { Router } from 'express'

import usersRoutes from './users'
import contactsRoutes from './contacts'
import authRoutes from './auth'

const router = Router()

router.use('/users', usersRoutes)
router.use('/contacts', contactsRoutes)
router.use('/auth', authRoutes)

export default router
