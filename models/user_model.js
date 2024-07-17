import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const userSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    otherNames: { type: String },
    username: { type: String, lowercase: true, unique: true },
    email: { type: String, lowercase: true, unique: true },
    password: { type: String },
    event: [{ type: Types.ObjectId, ref: "Event" }],
    college: [{ type: Types.ObjectId, ref: "College" }],
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(toJSON);

export const UserModel = model("User", userSchema);
