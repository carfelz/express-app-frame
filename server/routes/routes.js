import express from 'express'
import controllers from '../controllers/user'

const router = express.Router();

router.route('/api/users')
.get(controllers.get)
.post(controllers.create)

router.route('/api/users/:userId')
.get(controllers.read)
.put(controllers.update)
.delete(controllers.deletes)

router.param('userId', controllers.getById)

export default router