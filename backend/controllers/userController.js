const registerUser =  (req, res) => {
    if(!req.body.email) {
        res.status(400);
        throw new Error("Email is required");
    }
    res.send("Register User");
}

module.exports = {
    registerUser,
}