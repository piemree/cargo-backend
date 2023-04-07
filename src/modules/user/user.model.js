const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: async function (v) {
        if (this.type === "personel") {
          if (v) return true;
          else return false;
        } else {
          return true;
        }
      },
    },
  },
  password: {
    type: String,
    minlength: 6,
    validate: {
      validator: async function (v) {
        if (this.type === "personel") {
          if (v) return true;
          else return false;
        } else {
          return true;
        }
      },
    },
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["customer", "personel"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);

// if password flield is not empty, hash the password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare the password with the hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
