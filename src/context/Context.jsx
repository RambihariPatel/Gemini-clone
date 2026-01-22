import { createContext, useState } from "react";
import runChat from "../components/config/gemini";

export const Context = createContext("");

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Typing effect
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const onSent = async (prompt) => {
    const finalPrompt = prompt || input;

    if (!finalPrompt) return;

    setLoading(true);
    setShowResult(true);
    setResultData("");
    setRecentPrompt(finalPrompt);
    setPrevPrompts(prev => [...prev, finalPrompt]);

    try {
      const response = await runChat(finalPrompt); // ✅ API call

      // Bold formatting (**text**)
      let responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
          formattedResponse += responseArray[i];
        } else {
          formattedResponse += `<b>${responseArray[i]}</b>`;
        }
      }

      // Line breaks (*)
      let finalResponse = formattedResponse.split("*").join("<br/>");

      // Typing animation
      let wordsArray = finalResponse.split(" ");
      for (let i = 0; i < wordsArray.length; i++) {
        delayPara(i, wordsArray[i] + " ");
      }

    } catch (error) {
      console.error("Error while fetching response:", error);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const value = {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
  };

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
