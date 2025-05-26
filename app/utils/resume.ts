import User from "../lib/models/User";
import dbConnect from "../lib/db/connect";

export const getUserResume = async (userId : string) => {
  try {
    await dbConnect();
    const user = await User.findById(userId).select("resume");
    if (!user) throw new Error("User not found");
    if(!user.resume?.url){
        throw new Error("User resume not found");
    }
    return user.resume?.url;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

