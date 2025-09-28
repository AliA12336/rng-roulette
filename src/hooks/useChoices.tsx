import { createContext, useContext, useState, type PropsWithChildren } from "react";

type Choice = {
    input: string,
    id: string
}
type Choices = Choice[]

type ChoicesContextType = {
    choices: Choices;
    setChoices: (data: Choices) => void;
}

export const ChoicesContext = createContext<ChoicesContextType | null>(null);

export const ChoicesProvider = ({children}: PropsWithChildren) => {
    const [choices, setChoices] = useState<Choices>([]);

    return (
        <ChoicesContext.Provider value={{choices, setChoices}}>
            {children}
        </ChoicesContext.Provider>
    )
}

export const useChoices = () => {
    const context = useContext(ChoicesContext)
      if (!context) {
        throw new Error("useChoices must be used within a ChoicesProvider.")
      }
    
      return context
}