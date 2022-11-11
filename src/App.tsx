import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { Calendar } from "./components/Calendar";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function test() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    await invoke("test");
  }

  return (
    <div className="container">
      <button onClick={test}>Generate file</button>
      <Calendar />
    </div>
  );
}

export default App;
