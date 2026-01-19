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

  const onSent = async (prompt) => {
      const finalPrompt = prompt || input;

      setLoading(true);
      setShowResult(true);
      setRecentPrompt(finalPrompt);

      try {
        const response = await runChat(finalPrompt);
        setResultData(response);
      } catch (error) {
        console.error("Error while fetching response:", error);
        setResultData("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };


  const value = {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompts,
    setPrevPrompts,
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
