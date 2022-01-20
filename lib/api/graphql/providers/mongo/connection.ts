import mongoose from "mongoose";

const { NODE_ENV, DB_URL, DB_USERNAME, DB_PASSWORD } = process.env;

export const connect = async () => {
  const uri =
    NODE_ENV === "production"
      ? `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}${DB_URL}`
      : DB_URL;

  await mongoose
    .connect(String(uri))
    .catch((err) => console.error(err))
    .then(() => {
      console.log(` 🛠  ${DB_URL} 🛠 `);
      console.log(" 🛠 Successfully connected to the database! 🛠 ");
    });
};
