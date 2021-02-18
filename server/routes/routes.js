import express from 'express'
import controllers from '../controllers/user'

const user = express.Router();

user.route('/api/users')
.get(controllers.get)
.post(controllers.create)

user.route('/api/users/:userId')
.get(controllers.read)
.put(controllers.update)
.delete(controllers.deletes)

user.param('userId', controllers.getById)

export default user