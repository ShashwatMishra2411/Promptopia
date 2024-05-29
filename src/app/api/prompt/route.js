import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    console.log(prompts)
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
