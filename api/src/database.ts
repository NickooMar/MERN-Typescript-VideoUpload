import mongoose, { ConnectionOptions } from "mongoose";
import config from './config';


(async () => {
  try {
    const mongoseOptions: ConnectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
        /* user: config.MONGO_USER,
        pass: config.MONGO_PASSWORD */
      }
      const db = await mongoose.connect(`mongodb://${config.MONGO_HOST}/${config.MONGO_DATABASE}`, mongoseOptions);
      console.log("Database is connected to:", db.connection.name);
  } catch (error) {
      console.error(error);
  }
})();