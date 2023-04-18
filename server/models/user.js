import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: {type: String, required: true, default: ""}
}, {
    timestamps: true
});

// compare the user input password with the actual user password
// because user input password is a normal string
// while the actual user password has been encrypted by bcrypt
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// before saving user to db, encrypt the password
userSchema.pre('save', async function(next) {
    // if password is modifed => move on - don't need to generate a new hash
    if (!this.isModified('password')) { 
        next(); 
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User; 