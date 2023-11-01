import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// - Website
// - Contact person name
// - Phone number

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: false,
      max: 1000,
    },
    password: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
      max: 120,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
    // i.e. is the password is already modified. then do nothing.
  }

  // if not then just encrypt it
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);
