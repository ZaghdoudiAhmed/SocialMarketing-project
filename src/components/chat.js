
import react, { useEffect, useState } from 'react';
import {IoMdSend}  from 'react-icons/io';
import {BiBot,BiUser} from 'react-icons/bi';
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import axios from 'axios';

function Chat(){
    const [chat,setChat] = useState([]);
    const [inputMessage,setInputMessage] = useState('');
    const [botTyping,setbotTyping] = useState(false);
    const [x,setx]=useState(null)
    const [y,sety]=useState(null)
    const getimage =() =>{
axios.get('http://127.0.0.1:8000/hub/takeimage').then((res)=>{
  console.log(res.data)
  setx(res.data['pred'])
  sety(res.data['bar'])
})
    }
   useEffect(()=>{
  
  
    
    },[chat])

    const close = () => {
        var elts = document.getElementsByClassName("chat-box");
        elts[0].classList.remove("show");
      };
      const change = () => {
        var elts = document.getElementsByClassName("chat-box");
        elts[0].classList.add("show");
      };

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        const name = "shreyas";
        const request_temp = {sender : "user", sender_id : name , msg : inputMessage};
        
        if(inputMessage !== ""){
            
            setChat(chat => [...chat, request_temp]);
            setbotTyping(true);
            setInputMessage('');
            rasaAPI(name,inputMessage);
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }

    const rasaAPI = async function handleClick(name,msg) {
    
        //chatData.push({sender : "user", sender_id : name, msg : msg});
        

          await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'charset':'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
        .then(response => response.json())
        .then((response) => {
            if(response){
                const temp = response[0];
                const recipient_id = temp["recipient_id"];
                const recipient_msg = temp["text"];        


                const response_temp = {sender: "bot",recipient_id : recipient_id,msg: recipient_msg};
                setbotTyping(false);
                
                setChat(chat => [...chat, response_temp]);
               // scrollBottom();

            }
        }) 
    }

    return (
      <div>
        {/* <button onClick={()=>rasaAPI("shreyas","hi")}>Try this</button> */}
        
        <div>
                            <Avatar
                              onClick={change}
                              alt="Remy Sharp"
                              src="images/resources/ahmed.gif"
                            />
                          </div>
        <div className="chat-box">
        <div className="chat-head">
        <h5>AI Assistant</h5>
              <span className="status f-online" />
              <h6>Ahmed Chokri</h6>
           <div className="more">
                <span>
                  <i className="ti-more-alt" />
                </span>
                <span className="close-mesage">
                  <i className="ti-close" onClick={close} />
                </span>
              </div>
              {botTyping ? <h6>Bot Typing....</h6> : null}
            </div>
            <div className="chat-list">
              <ul className="scroll">   {chat.map((user,key) => (
                                <div key={key}>
                                    {user.sender==='bot' ?
                                        (
                                            <div>
                                            <div className= 'msgalignstart'>
                                                <BiBot className="botIcon"  /><h6 className="botmsg">{user.msg}</h6>
                                              
                                            
                                            </div>
                                            <div>
                                          {user.msg==="what is your feedback on the product received  ?"&&(
                                                  <div>
                                                      <button onClick={getimage} name="Click the Photo" defaultValue="Click an Image" className="btn btn-outline-primary" >
                                                        Take a photo
                                                        </button>
                                                <img className="mto"alt =""src={"data:image/jpeg;base64,"+x}></img>
                                                <img alt=""src={"data:image/jpeg;base64,"+y}></img>
                                                </div>
                                                )
                                              }
                                           </div>
                                           </div>
                                        )

                                        :(
                                            <div className= 'msgalignend'>
                                                <h6 className="usermsg">{user.msg}</h6><BiUser className="userIcon" />
                                            </div>
                                        )
                                    }
                                </div>
                            ))}
                </ul>
         </div>
              <form className="text-box" onSubmit={handleSubmit}>
                <textarea
                  onChange={e => setInputMessage(e.target.value)} value={inputMessage} type="text"
                />
                <Button type="submit">
                  <SendIcon></SendIcon>{" "}
                </Button>
              </form>
            </div>
      </div>
    );
}

export default Chat;
