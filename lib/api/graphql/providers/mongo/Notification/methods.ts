import {
  CreateNotificationInput,
  Notification as NotificationType,
} from "../../../generated/schema";
import { Notification } from "./model";

type FetchNotification = (args: {
  id: string;
  includeDone?: boolean;
}) => Promise<NotificationType>;
export const fetchNotification: FetchNotification = async ({
  id,
  includeDone = false,
}) => {
  if (includeDone) return await Notification.findById(id);
  return await Notification.findById(id, { done: false });
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
  fetchNotification: FetchNotification;
  createNotification: CreateNotification;
  markNotificationAsDone: MarkNotificationAsDone;
};
