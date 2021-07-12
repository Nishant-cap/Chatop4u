const {createUser,getUserByUserId,getUsers,updateUser,login,deleteUser} = require("./user.controller");
const router = require("express").Router();
const {checkToken} =require("../../auth/token_validation")
const {checkPermission}=require("../../auth/permissions")

router.post("/createuser",createUser);
router.post("/login",login);
router.get("/getallusers",checkToken,checkPermission(["admin"]),getUsers);
router.get("/getuser",checkToken,checkPermission(["admin"]),getUserByUserId);
router.patch("/updateuser",checkToken,updateUser);
router.delete("/delete",checkToken,checkPermission(["admin"]),deleteUser);


module.exports = router;
