import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    secret: {
      type: String,
      required: true,
      lowercase: true, // Red red
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    about: {},
    image: {
      url: String,
      public_id: String,
    },
    
    following: [{ type: Schema.ObjectId, ref: "User" }],
    followers: [{ type: Schema.ObjectId, ref: "User" }],
    role: {
      type: String,
      default: "Subscriber",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
