import { useState , useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
  let [lenght , setLenght] = useState(8);
  let [CharacterAllow , setCharacterAllow] = useState(false);
  let [numberAllow , setNumberAllow] = useState(false);
  let [password , setPassword] = useState("");
  let passwordRef = useRef(null);
  let copyFun = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,6);
    window.navigator.clipboard.writeText(password);
  }

  const passwordGene = useCallback(() => {
    let pass = "";
    let str ;
    str = "abcdefghijklmnopqrstuvwxyz";
    if(numberAllow) str += "1234567890";
    if(CharacterAllow) str += "!@#$%^&*()_+?";
    for(let i =1 ; i <= lenght; i++){
      let index = Math.floor(Math.random() * str.length + 1) ;
      pass += str.charAt(index);
    }
    setPassword(pass);
  } , [CharacterAllow,numberAllow,lenght]);
useEffect(
  passwordGene,
  [CharacterAllow,numberAllow,lenght,setPassword]
)


  return (
    <>
   <div className="body"
   style={{
    height:"100vh",
    width:"100vw",
    display:"flex",
    justifyContent:"center"
   }}
   >
   <div className="container"
     style={{
      backgroundColor:" rgb(31, 30, 30)", 
      width:"600px" , 
      height:"140px" ,
      borderRadius:"20px",
      color:"white",
      paddin:"10px 0"
     }}
     >
     <div className="firstCon"
     style={{
      display:"flex",
      width:"98%",
      height:"50px",
      backgroundColor:"white",
       margin:"10px auto",
       backgroundColor:"rgb(236, 242, 248)",
       borderRadius:'10px'
     }}
     >
      <input type="text" 
       ref={passwordRef}
      value={password}
      readOnly
      style={{
        width:"100%",
        height:"100%",
        border:"none",
        borderRadius:"10px",
        background:"none",
        padding:"2px 10px",
        fontSize:"20px",
        letterSpacing:"1px",
        overflow:"hidden",
        outline:"none"
      }}
      />
      <button 
      onClick={copyFun}
      style={{
        backgroundColor:"cyan",
        height:"100%",
        width:"100px",
         border:"none",
         outline:"none",
         borderRadius:"10px",
         cursor:"pointer",
         fontSize:"16px",

      }}
      >
        copy
      </button>
     </div>
     <div className="secondCont"
     style={{
      display:"flex",
      justifyContent:"space-around",
      marginTop:"50px"
     }}
     >
      <div className="range">
      <input type="range" 
      min={6}
      max={50}
      value={lenght}
      onChange={(e) => setLenght(e.target.value)}
      /> <span
      style={{
        fontSize:"20px",
        color:"cyan"
      }}
      >lenght :{lenght}</span>
      </div>
      <div className="char">
      <input
       type="checkbox"
       defaultChecked={CharacterAllow}
       onChange={() => {
        setCharacterAllow(CharacterAllow => !CharacterAllow)
       }}
       />
      <span
      style={{
        fontSize:"20px"
      }}>Character</span>
      </div>
      <div className="num">
      <input
        defaultChecked={numberAllow}
        onChange={() => {
         setNumberAllow(numberAllow => !numberAllow)}}
      type="checkbox"
       />
      <span
      style={{
        fontSize:"20px"
      }}>Numbers</span>
      </div>
     </div>
     </div>
   </div>
    </>
  )
}

export default App
