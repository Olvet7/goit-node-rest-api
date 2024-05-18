import { Schema, model } from "mongoose";
import handleMongooseError from "../helpers/helperMongooseError.js";


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true, 
    }
  },
  { versionKey: false, timestamps: true }
)

contactSchema.post("save", handleMongooseError);

const Contact = model("Contact", contactSchema);

export default Contact;
