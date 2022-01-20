import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const NotificationSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },
    context: {
      type: String,
      enum: ["Game", "Comment", "Player"],
      required: true,
    },
    resourceId: {
      type: Schema.Types.ObjectId,
      refPath: "context",
    },
    notificationType: {
      type: String,
      enum: ["GAME_RECORDED", "COMMENT_RECEIVED"],
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NotificationModel =
  mongoose.models.Notification ||
  mongoose.model("Notification", NotificationSchema);

export { NotificationModel as Notification };
