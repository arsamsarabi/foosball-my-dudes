import mongoose from "mongoose";

const { DB_URL } = process.env;

export const connect = async () => {
  await mongoose
    .connect(String(DB_URL))
    .catch((err) => console.error(err))
    .then(() => {
      console.log(` 🛠  ${DB_URL} 🛠 `);
      console.log(" 🛠 Successfully connected to the database! 🛠 ");
    });
};
