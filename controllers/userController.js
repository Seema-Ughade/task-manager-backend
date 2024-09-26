const cloudinary = require('cloudinary').v2;
const User = require('../models/User'); // Use require instead of import
const bcrypt = require('bcrypt'); // Use require instead of import

exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, project, role, salary, status } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        let profilePicture = null;

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePicture = result.secure_url;
        }

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            project,
            role,
            salary,
            status: status || true,
            profilePicture,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, phone, password, project, role, salary, status } = req.body;

        let profilePicture = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePicture = result.secure_url;
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            phone,
            password: password ? await bcrypt.hash(password, 10) : undefined, // Hash only if password is provided
            project,
            role,
            salary,
            status,
            profilePicture,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
