import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const PlayerSchema = new Schema(
  {
    nickname: {
      type: String,
      trim: true,
      default: "¿como tú te llamas",
    },
    tag: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/arsam/image/upload/v1642291073/foosballdude/placeholder_u9cmj2.svg",
    },
  },
  {
    timestamps: true,
  }
);

const PlayerModel =
  mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export { PlayerModel as Player };
