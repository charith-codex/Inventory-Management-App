const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be at least 6 characters long'],
        //maxLength: [23, 'Password cannot be more than 23 characters long']
    },
    photo: {
        type: String,
        required: [true, 'Please add a photo'],
        default: 'https://i.ibb.co/4pDNDk1/avatar.png'
    },
    phone: {
        type: String,
        default: '+94'
    },
    bio: {
        type: String,
        maxLength: [250, 'Bio cannot be more than 250 characters long'],
        default: 'bio'
    },
}, {
    timestamps: true
});

//encrypt password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
})

const User = mongoose.model('User', userSchema);
module.exports = User;