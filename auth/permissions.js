module.exports = {
    checkPermission: (permissions) => {

        return (req,res,next) => {
            const userRole=req.body.role
            if(permissions.includes(userRole)){
                next()
            }
            else{
                return res.json({
                    success: 0,
                    message: "You are not authorized"
                });
            }
        }
    }
};

