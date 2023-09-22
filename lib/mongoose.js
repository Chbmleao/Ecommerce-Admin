import mongoose from "mongoose";

export async function mongooseConnect() {
  const uri = process.env.MONGODB_URI;
  console.log(uri);
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return mongoose.connect(uri);
  }
}
