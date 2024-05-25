import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();
    console.log(params)
    // console.log(id);
    const prompts = await Prompt.find({creator:params.id}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
