import { Schema, model, Document } from "mongoose";
import { workspaceActions } from "../types/workspace";
const { ObjectId } = Schema.Types;

export interface workspaceDocument extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  OrgType: string;
  action: workspaceActions;
}

const WorkspaceSchma = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Date,
      required: true,
    },

    address: {
      type: Date,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    OrgType: {
      type: String,
      require: true,
    },
    action: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);
export const Workspace = model<workspaceDocument>("Workspace", WorkspaceSchma);
