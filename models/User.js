
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
//   project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
//   salary: { type: Number, required: true },
//   // status: { type: String, enum: ['active', 'inactive'], default: 'active' },
//   profilePicture: { type: String }, // URL for profile picture

//   status: {
//     type: String,
//     enum: ['active', 'inactive'], // or whatever values you define
//     default: 'active',
//   },
//   isActive: {
//     type: Boolean,
//     default: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Required field
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email uniqueness
        match: /.+\@.+\..+/ // Simple email validation regex
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/, // Ensure it's a 10-digit number
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a Role model
        ref: 'Role', // Assuming you have a Role model defined
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, // Reference to a Project model
        ref: 'Project', // Assuming you have a Project model defined
        required: true
    },
    salary: {
        type: Number,
        required: true,
        min: 0 // Ensure salary is not negative
    },
    isActive: {
        type: Boolean,
        default: true // Default to true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Limited to specific status values
        default: 'active' // Default status
    },
    profilePicture: {
        type: String, // Store URL of the uploaded image
        required: false // Optional, in case the user doesn't upload a picture
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

// Create the User model
userSchema.methods.isPasswordValid = async function (inputPassword) {
    // Compare the input password with the hashed password stored in the database
    return await bcrypt.compare(inputPassword, this.password);
  };
  
  // Pre-save hook to hash the password before saving the user
  userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  // Create the User model
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
  