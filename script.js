// 1. Paste your API Key here
const apiKey = "PASTE_YOUR_GOOGLE_GEMINI_KEY_HERE"; 

// 2. The function to call the AI
async function callGemini(prompt) {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            }
        );
        const data = await response.json();
        // This extracts the text answer from the complex JSON response
        return data.candidates[0].content.parts[0].text.trim();
    } catch (error) {
        console.error("Error calling AI:", error);
        alert("AI Error. Check console for details.");
        return null;
    }
}

// 3. The function that handles the buttons
async function triggerAI(mode) {
    // Get the user's text from your input field
    const inputField = document.getElementById('textInput'); 
    const text = inputField.value.trim();

    if (!text) { alert("Please type some text first!"); return; }

    // Define your prompts
    const prompts = {
        emojify: `Rewrite this text by adding relevant emojis. Text: "${text}"`,
        grammar: `Fix grammar and spelling. Return ONLY the fixed text. Text: "${text}"`,
        hashtags: `Generate 10 viral hashtags for this text. Text: "${text}"`,
        slang: `Translate this into Gen Z slang. Text: "${text}"`,
        professional: `Rewrite this to sound professional. Text: "${text}"`,
        ascii: `Generate small ASCII art for: "${text}".`
    };

    // Call the API
    const result = await callGemini(prompts[mode]);

    // Update your website with the result
    if (result) {
        inputField.value = result; // Or display it wherever you want
    }
}