// const { required } = require('joi')
// const mongoose = require('mongoose')
// const bcrypt = require('bcryptjs')
// const Schema = mongoose.Schema

// const userModel = new Schema({
//     first_name: {
//         type: String,
//         required: true
//     },
//     last_name: {
//         type: String,
//         required: true
//     },
//     email:{
//         type: String,
//         required: true
//     },
//     age: {
//         type: Number,
//         required: true,
//         min: [18, 'Age must be at least 18 years'],
//         max: [100, 'Age must not exceed 100 years'] 
//     },
//     password: {
//         type: String,
//         require: true
//     }

// })
// userModel.pre('save', async function(next){
//     const salt =  await bcrypt.genSalt()
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

// const User = mongoose.model('User', userModel)

// module.exports = User;
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
            },
            goal: {
                type: DataTypes.STRING
            }

        },
        {
            tableName: 'users',
            hooks: {
                beforeCreate: async (user) => {
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
                    user.password = hashedPassword;
                },
            },
        }
    );

    return User;
};
