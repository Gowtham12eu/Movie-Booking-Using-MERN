const mongoose = require('mongoose');
module.exports = (connection) => {
    const SignUp = new mongoose.Schema
        (
            {
                ClerkUserId: String,
                FirstName: String,
                LastName: String,
                EmailAddress: String,
                Password: String
            }
        )
    return connection.model('SignUpModule', SignUp)
}