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
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

    const response = await runChat(input);
    setResultData(response);

    setLoading(false);
    setInput("");
    setInput("")
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
