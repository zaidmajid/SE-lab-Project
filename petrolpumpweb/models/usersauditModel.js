import mongoose from "mongoose";

const UsersauditSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  oldValue: {
    type: Object,
    required: true,
  },
  newValue: {
    type: Object,
    required: true,
  },
},
{ timestamps: true }
);

export default mongoose.model("usersaudit", UsersauditSchema);