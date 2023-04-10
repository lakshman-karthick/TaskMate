import express from 'express'
import control from './controller.js'

const router = express.Router();
router.route("/").get(control.apiGetToDo)
router.route("/").post(control.apiPostToDo)
router.route("/:id").put(control.apiPutToDo).delete(control.apiDeleteToDo)

export default router