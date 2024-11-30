const { mongoose} = require('mongoose');
const { Schema } = mongoose;


// this schema is only the structure so we need convert into model by using of mongoose.model
const userSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        unique: [true, 'Email is required'],
        required: true,
        lowercase: true

    },
    age: {
        type: Number
        },
    },
    {
        timestamps: true
    }
)



// this covert schema into model by this we can interact with the data base
const user = mongoose.model('user', userSchema )

module.exports = user;












// we can gave these fields too
// required: Ensures the field must have a value.
// unique: Enforces a unique constraint.
// min/max: For numeric range validations.
// minlength/maxlength: For string length validations.
// match: Regex pattern matching.
// validate: Custom validation logic.
// default: Sets a default value if not provided.
