import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/user-icon.png";
import gptImgLogo from "./assets/chatgptLogo.svg";
import { sendMsgToOpenAI } from "./openai";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    // Initial chat history
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello, ChatGPT!" },
  ]);

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);

    try {
      const response = await sendMsgToOpenAI(input);
      const botMessage = { role: "assistant", content: response };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
      console.log("ChatGPT Response:", chatHistory);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error("API rate limit exceeded. Please try again later.");
        // Можно добавить обработку более длительной задержки или другие действия
      } else {
        console.error("Error calling OpenAI API:", error);
      }
    }

    setInput("");
  };
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div class="upperSideTop">
            <img src={gptLogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midBtn">
            <img src={addBtn} alt="new chat" className="addBtn" />
            New Chat
          </button>
          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="Query" className="" />
              What is Programming ?
            </button>
            <button className="query">
              <img src={msgIcon} alt="Query" className="" />
              How to use an API ?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listItems">
            <img src={home} alt="Home" className="listItemsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="Save" className="listItemsImg" />
            Save
          </div>
          <div className="listItems">
            <img src={rocket} alt="Upgrade Pro" className="listItemsImg" />
            Upgrade to PRO
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          <div className="chat">
            <img src={userIcon} alt="" className="chatImg" />
            <p className="txt">
              loremloremloremloremloremloremloremloremloremloremlorem
            </p>
          </div>
          <div className="chat bot">
            <img src={gptImgLogo} alt="" className="chatImg" />
            <p className="txt">
              loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
            </p>
          </div>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handleSend}>
              <img src={sendBtn} alt="send message" className="" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT August 20 version.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
