import { connectToDB } from "@/utils/db";
import Prompt from "@/models/prompt";
// GET (read)
export const GET = async (req, res, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};

// PATCH(update)
export const PATCH = async (req, res, { params }) => {
  try {
    await connectToDB();
    const { prompt, tag } = await req.json();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
// DELETE (delete)
export const DELETE = async (req, res, { params }) =>{
    try{
        await connectToDB();
        const prompt = await Prompt.findById(params.id);
        if(!prompt){
            return new Response("Prompt not found", { status: 404 });
        }
        await prompt.remove();
        return new Response(JSON.stringify(prompt), { status: 200 });
        
    }catch(e){
        console.log(e.message);
        return new Response(e.message, { status: 500 });
    }
}