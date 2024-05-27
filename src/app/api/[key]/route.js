import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
import User from "@/models/user"; // Assuming you have a User model for the username search

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    console.log(params);
    const search = params.key;
    console.log(search);
    if (!search) {
      return new Response("Search parameter is missing", { status: 400 });
    }

    // Regular expression for case-insensitive search
    const searchRegex = new RegExp(search, "i");

    // Find users matching the search term to get their IDs
    console.log(searchRegex);
    const users = await User.find({
      $or: [{ username: searchRegex }, { email: searchRegex }],
    }).select("_id");
    console.log(users);
    const prompts = await Prompt.find({
      $or: [
        { tag: searchRegex },
        { prompt: searchRegex },
        { creator: { $in: users } },
      ],
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
