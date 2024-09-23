const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{
        type : String,
        required : true,
        unique: true,
        trim : true,
    },
    email:{
        type : String,
        required : true,
        unique: true,
        trim : true,
    },

    password : {
        type : String,
        required : true,
    },
    photo : {
        type : String,
    },
    createdAt  : {
        type : Date,
        default : Date.now,
    },
    updatedAt  : {
        type : Date,
        default : Date.now
    }
});


//Hashing password before saving to the database

userSchema.pre('save', async function (next){
    if(!this.isModified('password')) {
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();

    }catch(error){
        next(error);
    }
});

//compare password method

userSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User' ,userSchema)