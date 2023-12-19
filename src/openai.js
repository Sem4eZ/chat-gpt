// openai.js
import axios from "axios";

const OPENAI_API_KEY = "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"; 

export const sendMsgToOpenAI = async (input) => {
  try {
    // Добавляем задержку в 1 секунду перед каждым запросом
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Ошибка вызова OpenAI API:", error);
    return "Ошибка";
  }
};
