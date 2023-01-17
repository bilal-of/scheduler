import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); 
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {   
    const newHistory = [...history]; 
    setMode(newMode)
    if (replace) { 
      newHistory.pop(); 
      setHistory(newHistory)
    }  
    setHistory((prev) => [...prev, newMode]) 
  }
  function back() {   
    if (history.length > 1) { 
      const newHistory = [...history] 
      newHistory.pop() 
      setHistory(newHistory) 
      setMode(newHistory[newHistory.length - 1]) 
    }
  }
  return { mode, history, transition, back };
}