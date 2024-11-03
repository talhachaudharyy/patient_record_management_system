const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['patient', 'doctor'],
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    specialization: {
        type: String,
        required: function() {
            return this.type === 'doctor';
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);