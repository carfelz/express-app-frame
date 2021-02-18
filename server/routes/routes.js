import express from 'express'
import controllers from '../controllers/user'
import auth from '../controllers/auth'

const router = express.Router();


router.route('/api/users')
.get(controllers.get)
.post(controllers.create)

router.route('/api/users/:userId')
.get(controllers.read)
.put(controllers.update)
.delete(controllers.deletes)

router.route('/auth/signin')
.post(auth.signin)

router.route('/auth/signout')
.get(auth.signout)

router.param('userId', controllers.getById)

export default router