import { model, Schema, Types } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const collegeSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    banner: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

collegeSchema.plugin(toJSON);

export const CollegeModel = model("College", collegeSchema);
