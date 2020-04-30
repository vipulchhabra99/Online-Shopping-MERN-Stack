const express = require('express');
const router = express.Router();

router.post('/', (req,res) => {

    // Deleting the user cookie on logout.
    res.clearCookie('parmas');
    res.status(200).send("User loged out successfully");
})

module.exports = router;