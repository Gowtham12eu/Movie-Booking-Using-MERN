const mongoose=require('mongoose');
module.exports=(connection)=>
{
    const Login=new mongoose.Schema
    (
        {
            ClerkUserId:String,
            EmailAddress:String,
            Password:String
        }
    )
    return connection.model('LoginModule',Login);
}