const mongoose = require("mongoose");





//database 연결

const options = {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

//promise
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err.message));