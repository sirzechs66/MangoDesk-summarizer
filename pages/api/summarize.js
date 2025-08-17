import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { transcript, customPrompt } = req.body;

  if (!transcript) {
    return res.status(400).json({ message: "Transcript is required." });
  }

  // Construct the exact same prompt we used for OpenAI
  const finalPrompt = `
    Here is a transcript:
    ---
    ${transcript}
    ---
    Based on the transcript above, please follow this instruction: "${customPrompt || "Summarize the key points in clear bullet points."}"
  `;

  try {
    // Select the Gemini model. 'gemini-1.5-flash-latest' is fast and effective.
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    // Generate the content using the prompt
    const result = await model.generateContent(finalPrompt);
    const response = result.response;

    // Get the summary text from the Gemini response
    const summary = response.text();

    // Send the summary back to the frontend, same as before
    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error with Google Gemini API:", error);
    res.status(500).json({ message: "Failed to generate summary." });
  }
}
