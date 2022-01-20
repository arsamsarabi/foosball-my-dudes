import {
  CreateNotificationInput,
  Notification as NotificationType,
} from "../../../generated/schema";
import { Notification } from "./model";

type FetchMyNotifications = (args: {
  id: string;
  includeDone?: boolean;
}) => Promise<Array<NotificationType>>;
export const fetchMyNotifications: FetchMyNotifications = async ({
  id,
  includeDone = false,
}) => {
  if (includeDone) return await Notification.findById(id);
  return await Notification.find({ to: id, done: false })
    .populate("from")
    .populate("to");
};

type CreateNotification = (args: {
  newNotification: CreateNotificationInput;
}) => Promise<NotificationType>;
export const createNotification: CreateNotification = async ({
  newNotification,
}) => {
  const notification = new Notification(newNotification);
  return await notification.save();
};

type MarkNotificationAsDone = (args: {
  id: string;
}) => Promise<NotificationType>;
export const markNotificationAsDone: MarkNotificationAsDone = async ({
  id,
}) => {
  const notification = await Notification.findById(id);
  notification.done = true;
  return await notification.save();
};

export type NotificationProvider = {
  fetchMyNotifications: FetchMyNotifications;
  createNotification: CreateNotification;
  markNotificationAsDone: MarkNotificationAsDone;
};
