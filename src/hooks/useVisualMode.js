import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setMode(newMode)
    setHistory(prev => {
      if (replace) {
        let newHistory = [...prev]
        newHistory.pop()
        newHistory.push(newMode)
        return newHistory
      } else {
        return [...prev, newMode]
      }
    })
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