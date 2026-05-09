const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.generateVideoScript = async (rawCode, language) => {
  if (!process.env.AI_API_KEY) {
    throw new Error('AI_API_KEY is not configured in the environment variables.');
  }

  const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an expert developer educator. I am going to provide you with a ${language} code snippet. 
Your task is to analyze the logical flow of the code and break it down into teaching segments for a video tutorial.

Code:
\`\`\`${language}
${rawCode}
\`\`\`

Return a JSON array of objects detailing the video script. Each object MUST have the following keys:
- "timestamp": A string estimating the time (e.g., "00:00", "00:15").
- "spokenText": The exact words the educator should speak.
- "codeLineFocus": An integer representing the specific line number to highlight on screen. If focusing on multiple lines, pick the starting line or the most important line.
- "visualAction": A string suggesting a visual action (e.g., "Zoom in on the For-Loop", "Highlight the variable declaration").

Ensure the response is ONLY valid JSON, starting with [ and ending with ], without any markdown formatting like \`\`\`json.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean the response text to ensure it's parseable JSON
    // Sometimes the model might still wrap it in markdown despite instructions
    let jsonString = responseText.trim();
    if (jsonString.startsWith('\`\`\`json')) {
      jsonString = jsonString.substring(7);
    }
    if (jsonString.startsWith('\`\`\`')) {
      jsonString = jsonString.substring(3);
    }
    if (jsonString.endsWith('\`\`\`')) {
      jsonString = jsonString.substring(0, jsonString.length - 3);
    }
    jsonString = jsonString.trim();

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error generating script from AI:', error);
    throw new Error('Failed to generate script from AI: ' + error.message);
  }
};
