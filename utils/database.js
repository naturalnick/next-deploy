import mongoose from "mongoose";

let isConnected = false;

export async function connectToDB() {
	mongoose.set("strictQuery", true);

	if (isConnected) {
		console.log("MongdoDB is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "seedbase",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;

		console.log("MongoDB connected");
	} catch (error) {
		console.log(error);
	}
}
