import { createContext, useState } from "react";
import ListTodo from "./Components/ListTodo/ListTodo";
import Header from "./Components/Header/Header";
import "./App.css";

export const ItemViewModeContext = createContext();

function App() {
  const [viewMode, setViewMode] = useState("list");

  const handleItemViewMode = (mode) => {
    setViewMode(mode);
  };
  return (
    <>
      <ItemViewModeContext.Provider value={{ viewMode, handleItemViewMode }}>
        <Header />
        <ListTodo />
      </ItemViewModeContext.Provider>
    </>
  );
}

export default App;
