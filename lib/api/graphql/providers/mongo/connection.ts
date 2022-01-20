import mongoose from "mongoose";

const { NODE_ENV, DB_URL, DB_USERNAME, DB_PASSWORD } = process.env;

export const connect = async () => {
  console.log("connecting to db in the clouds... ☁️");

  console.log(`NODE_ENV: ${NODE_ENV}`);

  const connectConfig =
    NODE_ENV === "production"
      ? {
          user: DB_USERNAME,
          pass: DB_PASSWORD,
        }
      : {};

  await mongoose
    .connect(String(DB_URL), connectConfig)
    .catch((err) => console.error(err))
    .then(() => {
      console.log(` 🛠  ${DB_URL} 🛠 `);
      console.log(" 🛠 Successfully connected to the database! 🛠 ");
    });
};
