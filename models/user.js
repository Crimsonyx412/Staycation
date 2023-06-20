import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please insert your name!"],
    maxlength: [50, "Your name cannot exceed more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please insert your email!"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address!"],
  },
  password: {
    type: String,
    required: [true, "Please insert your password!"],
    minlength: [6, "Your name must be longer than 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

// ENCRYPTING PASSWORD BEFORE SENDING IT TO THE DATABASE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// COMPARE USER PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
