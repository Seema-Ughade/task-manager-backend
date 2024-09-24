// const User = require('../models/User');

// // Create User

// exports.createUser = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const newUser = new User({
//             username,
//             email,
//             password,
//             photo: req.file ? req.file.path : null
//         });

//         await newUser.save();

//         res.status(201).json({ message: 'User created successfully', user: newUser });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get User by ID

// exports.getUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const searchedUser = await User.findById(userId);

//         if (!searchedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json(searchedUser);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Get All Users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         res.json(users);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };


// // Update Single User by ID
// exports.updateUser = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const { username, email, password } = req.body;

//         const updatedUser = await User.findByIdAndUpdate(
//             userId,
//             { username, email, password, updatedAt: Date.now() },
//             { new: true, runValidators: true }
//         );

//         if (!updatedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({ message: 'User updated successfully', user: updatedUser });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delet Single User by ID
// exports.deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         const deletedUser = await User.findByIdAndDelete(userId);

//         if (!deletedUser) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Update All Users
// exports.updateAllUsers = async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const updatedUsers = await User.updateMany(
//             {},
//             { username, email, password, updatedAt: Date.now() },
//             { runValidators: true }
//         );

//         res.json({ message: 'All users updated successfully', updatedCount: updatedUsers.nModified });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // Delete All Users
// exports.deleteAllUsers = async (req, res) => {
//     try {
//         const deletedUsers = await User.deleteMany({});

//         res.json({ message: 'All users deleted successfully', deletedCount: deletedUsers.deletedCount });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const User = require('../models/User');
const cloudinary = require('../middlewares/cloudinaryConfig');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, phone, password, project, role, salary, status } = req.body;

        let profilePicture = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            profilePicture = result.secure_url;
        }

        const newUser = new User({
            name,
            email,
            phone,
            password, // Ensure to hash the password before saving
            project,
            role,
            salary,
            status,
            profilePicture,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
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
            password, // Ensure to hash the password before saving
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
