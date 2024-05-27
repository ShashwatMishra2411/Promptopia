import { connectToDB } from "../../../../utils/db";
import Prompt from "../../../../models/prompt";
export const POST = async (req, res) => {
  const { prompt, tag, userId, response } = await req.json();
  console.log(prompt, tag, userId, response)
  try {
    await connectToDB();
    const post = await Prompt.create({
      prompt: prompt,
      tag: tag,
      creator: userId,
      response: response,
    });
    return new Response(JSON.stringify(post), { status: 201 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
