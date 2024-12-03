const User = require("../models/userModel");

exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.log("Error fetching users:", err);
        res.status(500).json({ message: "Error fetching users" });
    }
};

exports.loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                phone_number: user.phone_number,
                address: user.address,
                country: user.country,
            },
        });
    } catch (err) {
        console.log("Error logging in:", err);
        res.status(500).json({ message: "Error logging in" });
    }
};

exports.createUser = async(req, res) => {
    const { id, full_name, email, password, phone_number, address, country } =
    req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const newUser = new User({
            id,
            full_name,
            email,
            password,
            phone_number,
            address,
            country,
        });

        await newUser.save();

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                phone_number: newUser.phone_number,
                address: newUser.address,
                country: newUser.country,
            },
        });
    } catch (err) {
        console.log("Error creating user:", err);
        res.status(500).json({ message: "Error creating user" });
    }
};

exports.updateUser = async(req, res) => {
    const { id } = req.params;
    const { full_name, email, password, phone_number, address, country } =
    req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, { full_name, email, password, phone_number, address, country }, { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                full_name: updatedUser.full_name,
                email: updatedUser.email,
                phone_number: updatedUser.phone_number,
                address: updatedUser.address,
                country: updatedUser.country,
            },
        });
    } catch (err) {
        console.log("Error updating user:", err);
        res.status(500).json({ message: "Error updating user" });
    }
};

exports.deleteUser = async(req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        console.log("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user" });
    }
};