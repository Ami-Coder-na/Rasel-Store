import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Product } from '../types';

// Lazy Initialize Gemini Client to prevent crash on load
let ai: GoogleGenAI | null = null;

const getAIClient = () => {
    if (!ai) {
        // Use empty string fallback to prevent crash if key is missing during render
        const apiKey = process.env.API_KEY || '';
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
}

export const generateShoppingAdvice = async (
  query: string,
  context: { products: Product[]; cart: Product[] }
): Promise<string> => {
  try {
    const aiClient = getAIClient();
    
    const productContext = context.products
      .map((p) => `- ${p.name} (${p.price} ${p.currency}): ${p.description}`)
      .join('\n');

    const cartContext = context.cart.length > 0 
      ? `User has in cart: ${context.cart.map(p => p.name).join(', ')}`
      : "Cart is empty.";

    const systemPrompt = `
      You are 'Rasel', a futuristic, helpful, and stylish shopping assistant for 'Rasel Store' (formerly Lumina), a Bangladesh-based tech/fashion store.
      
      Current Product Catalog:
      ${productContext}

      User Cart Status:
      ${cartContext}

      Rules:
      1. Be concise, witty, and helpful. 
      2. If the user asks about price, convert to BDT if needed (already in BDT).
      3. Recommend products based on the catalog provided.
      4. If asked about payment, mention bKash, Nagad, and seamless checkout.
      5. Use emojis sparingly but effectively 🚀.
      6. If the query is in Bangla (e.g., "ei shirt ta kemon?"), reply in English but acknowledge the context, or reply in Bangla if you are confident.
    `;

    const response: GenerateContentResponse = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    return response.text || "I'm having trouble connecting to the neural network. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Offline mode active. Unable to reach AI services right now.";
  }
};