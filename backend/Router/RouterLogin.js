const express = require('express');
const router = express.Router();



module.exports = (LoginModel, SignUpModel) => {
    const router = express.Router();

    router.post('/v1/user', async (req, res) => {
        const { ClerkUserId, EmailAddress, FirstName, LastName } = req.body;

        try {
            const existingSignup = await SignUpModel.findOne({ ClerkUserId });
            if (!existingSignup) {
                const newSignup = new SignUpModel({
                    ClerkUserId,
                    FirstName,
                    LastName,
                    EmailAddress,
                    Password: 'ClerkManaged'
                });
                await newSignup.save();
            }

            const existingLogin = await LoginModel.findOne({ ClerkUserId });
            if (!existingLogin) {
                const newLogin = new LoginModel({
                    ClerkUserId,
                    EmailAddress,
                    Password: 'ClerkManaged'
                });
                await newLogin.save();
            }

            res.status(200).json({ message: 'User data stored successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


    return router;
}