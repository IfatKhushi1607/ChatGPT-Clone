
import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg';
// import { sendMsgToOpenAI } from './openai';
import { useState } from 'react';
import { sendMsgToGemini } from './openai';


function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState([
    {
      text: "Hello there! How can I help you today?",
      isBot: true,
    }
  ]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const response = await sendMsgToGemini(input);
      setMsg([
        ...msg,
        { text: input, isBot: false },
        { text: response, isBot: true }
      ]);
      setInput("");
    } catch (error) {
      console.error(error);
      setMsg([
        ...msg,
        { text: input, isBot: false },
        { text: "Sorry, I encountered an error. Please try again.", isBot: true }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop"><img src={gptLogo} alt="Logo" className="logo" /> <span className="brand">chatGPT</span> </div>
          <button className="midBtn"><img src={addBtn} alt="new chat" className="addBtn" /> New Chat </button>
          <div className="upperSideBottom">
            <button className="query"><img src={msgIcon} alt="Query" /> What is Programming ?</button>
            <button className="query"><img src={msgIcon} alt="Query" /> How to use an API ?</button>

          </div>

        </div>
        <div className="lowerSide">
          <div className="listItems"><img src={home} alt="Home" className="listItemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listItemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listItemsImg" />Upgrade to pro</div>

        </div>
      </div>
      <div className="main">
        <div className="chats">

          {msg.map((msg, i) => (
            <div key={i} className={msg.isBot ? "chat bot" : "chat"}>
              <img className='chatImg' src={msg.isBot ? gptImgLogo : userIcon} alt='' />
              <p className='txt'>{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input
              type="text"
              placeholder='Send a message'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <button
              className="send"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <img src={sendBtn} alt="Send" />
              )}
            </button>
          </div>
          <p>ChatGPT may produce inaccurate information about places, people, or facts. ChatGPT August 20 Version.</p>
        </div>
      </div>

    </div>
  );
}

export default App;
