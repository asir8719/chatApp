import express from 'express'
import { chatbot } from '../controller/chatBot-controller.js'
const router = express.Router()

router.route('/wassupai').post(chatbot)

export {router}
