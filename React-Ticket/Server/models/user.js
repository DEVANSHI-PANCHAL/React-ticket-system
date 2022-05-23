import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  username:{type: String, required: true}
});

export default mongoose.model("User", userSchema);