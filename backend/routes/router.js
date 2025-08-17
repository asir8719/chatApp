import express from 'express'
import { chatbot } from '../controller/chatBot-controller.js'
import chat from '../controller/chat-Controller.js'
const router = express.Router()

router.route('/wassupai').post(chatbot)
router.route('/chat').post(chat)

export {router}