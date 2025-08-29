import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: true,
        },
        scores: {
            type: [Number],
            default: []
        },
        roundSubmitted: {
            type: Boolean,
            default: false
        }
    }
)

const User = mongoose.model('User', userSchema);
export default User;