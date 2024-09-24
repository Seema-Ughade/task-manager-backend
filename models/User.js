// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // Import bcrypt

// const Schema = mongoose.Schema;


// const userSchema = new Schema({
//     username:{
//         type : String,
//         required : true,
//         unique: true,
//         trim : true,
//     },
//     email:{
//         type : String,
//         required : true,
//         unique: true,
//         trim : true,
//     },

//     password : {
//         type : String,
//         required : true,
//     },
//     photo : {
//         type : String,
//     },
//     createdAt  : {
//         type : Date,
//         default : Date.now,
//     },
//     updatedAt  : {
//         type : Date,
//         default : Date.now
//     }
// });


// //Hashing password before saving to the database

// userSchema.pre('save', async function (next){
//     if(!this.isModified('password')) {
//         return next();
//     }

//     try{
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();

//     }catch(error){
//         next(error);
//     }
// });

// //compare password method

// userSchema.methods.comparePassword = async function (candidatePassword){
//     return await bcrypt.compare(candidatePassword, this.password);
// };


// module.exports = mongoose.model('User' ,userSchema)

// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  profilePicture: { type: String }, // URL for profile picture

  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
