import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
export const gemini_2_exp = google("gemini-2.0-flash-exp");
export const gemini_1_5_pro = google("gemini-1.5-pro");
export const deepSeekR1Groq = groq("deepseek-r1-distill-llama-70b");
