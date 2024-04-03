const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
},{
    collection:"registerinfo1"
}
)

const querySchema = new mongoose.Schema(
    {
        ids:String,
    category: String,
    voiceLanguage: String,
    queTitle: String,
    quDescription: String,
    startTime: String,
    endTime: String,
    attachment: String,
    subcategory: String,
    date: String
},{
    collection:"usersinfo1"
}
)

const UserModel = mongoose.model('Userinfo1',UserSchema)
const QueryModel1 = mongoose.model("registerinfo1",querySchema)

module.exports = {UserModel,QueryModel1}