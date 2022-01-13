const { Schema, model } = require('mongoose');
// const userSchema = require('./User');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

const User = model('user', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;