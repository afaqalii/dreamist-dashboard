import mongoose from 'mongoose';

const connectDB = async () => {
  let link = process.env.MONGODB_URI;
  console.log("link", link)
  await mongoose.connect(link as string);
};

export default connectDB;
