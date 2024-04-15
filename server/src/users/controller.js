const { isEmpty } = require("lodash");
const Users = require("../../models/user")

exports.getUsers = async (req, res) => {
    try {
        const filter = req.query || {};
        const users = await Users.find(filter);
        const response = {
            users: users,
            message: 'Users List',
        };
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.createUser = async (req, res) => {
    try {
        const { userId, userName, password } = req.body || {};
        const newUser = new Users({ userId, userName, password })
        await newUser.save();
        res.json({ message: 'User Created', user: newUser });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

exports.updateUser = async (req, res) => {
    try {
        const payload = req.body || {};
        const filter = req.query || {};
        await Users.updateMany({ ...filter }, {
            $set: payload
        });
        res.json({ message: 'Users Updated' })
    } catch (error) {
        console.log(error);
        throw error;
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const filter = req.query || {};
        await Users.deleteMany(filter);
        res.json({ message: "Users Deleted" });
    } catch (error) {
        console.log(error);
        throw error;
    }
}