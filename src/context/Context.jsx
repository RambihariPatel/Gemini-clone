import { createContext } from "react";
import runChat from "../components/config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const onsent = async (prompt) => {
        await runChat(prompt)
    }
    onsent("What is react")  
    const contextValue = {
 

    }

    return(
        <Context.Provider>
            {props.children}
        </Context.Provider>
    )
}