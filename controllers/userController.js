// const User = require('../models/User'); // Ensure this path is correct
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, project, role, salary, status } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePictureUrl = null;

        // Handle file upload to Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path); // Upload image to Cloudinary
            profilePictureUrl = result.secure_url; // Get secure URL from Cloudinary
        }

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            project,
            role,
            salary,
            status: status || true,
            profilePicture: profilePictureUrl, // Assign the secure URL
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: 'Error adding user' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Return the list of users
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Return the user details
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone, password, project, role, salary, isActive } = req.body;

        let profilePicture = null;

        // Handle file upload to Cloudinary from memory storage if a new file is provided
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result.secure_url);
                });
                req.file.stream.pipe(stream);
            });
            profilePicture = uploadResult; // Get secure URL from Cloudinary
        }

        // Update user with new information
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            project,
            role,
            salary,
            isActive,
            profilePicture,
        }, { new: true });

        // Handle user not found scenario
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user by ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};
