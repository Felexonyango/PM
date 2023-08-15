import mongoose, { Schema, model, Document, Model } from "mongoose";
const { ObjectId } = Schema.Types;
export interface IMenuItem extends Document {
  label: string;
  icon: string;
  role:[string];
  routerLink?: string[];
  
}

export interface IMenuItem  extends Document {
  label: string;
  icon: string;
  routerLink?: string[];
}
export interface IMenu extends Document {
  label: string;
  routerLink: [string];
  role: [string];
  icon: string;
  items:IMenu[]

}


export interface MenuModel extends Model<IMenu> {}


const menuItemSchema = new Schema({
  label: String,
  icon: String,
  routerLink: [String],
  role: [String]
});

const menuSchema = new Schema(
  {
    label: String,
    routerLink: [String],
    role: [String],
    icon: String,
    items: [menuItemSchema],
  },

  {
    timestamps: true,
  }
);

export const Menu = mongoose.model<IMenu, MenuModel>("Menu", menuSchema);
