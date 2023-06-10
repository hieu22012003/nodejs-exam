const express = require("express");
let router = express.Router();
const userController = require("../controllers/user.controller")

router.get("/list", userController.get);
router.get("/create", userController.createForm);
router.post("/create",userController.save)
router.get("/editUser/:id", userController.editForm);
router.post("/editUser/:id",userController.update)
router.post("/deleteUser/:id",userController.delete)


module.exports = router;