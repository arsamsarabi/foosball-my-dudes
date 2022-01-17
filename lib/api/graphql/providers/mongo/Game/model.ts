import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const GameSchema = new Schema(
  {
    teamOne: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    teamTwo: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
    teamOneScore: {
      type: Number,
      required: true,
    },
    teamTwoScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GameModel = mongoose.models.Game || mongoose.model("Game", GameSchema);

export { GameModel as Game };
