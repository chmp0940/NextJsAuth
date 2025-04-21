import mongoose from "mongoose";
export async function connect(){
  try {
    mongoose.connect(process.env.MONGO_URL!);
    /*
    The ! is a non-null assertion operator in TypeScript. It tells the TypeScript compiler that the value of process.env.MONGO_URL will never be null or undefined, even though TypeScript might think it could be.
    */
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    /*
    The on method in connection.on is an event listener provided by Node.js' EventEmitter (which Mongoose uses internally). It listens for specific events emitted by the MongoDB connection and executes a callback function when those events occur.
    */
    connection.on("error", () => {
      console.log("MongoDB connection failed");
      process.exit();
    });
  } catch (error) {
    console.log('Something went wrong');
    console.log(error);
  }
}