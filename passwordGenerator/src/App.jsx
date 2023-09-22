import { useState, useCallback, useEffect, useRef} from 'react'
// import './App.css'

function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef hook

  const passwordRef = useRef(null);
 
  // function

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // condition check
    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
      str +="!#$%^&*()_+-={}[]|:;<>?"
    }

    for (let i = 0; i<length; i++) {
      let char = Math.floor(Math.random()*str.length +1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length,numberAllowed, characterAllowed, setPassword])


  // function call

  useEffect(
    ()=>{
      passwordGenerator()
    }, [length, numberAllowed, characterAllowed]
  )

  // copy password function

  const copyPasswordToClipboard = useCallback(
    ()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(Password);
    },[Password]
  )
  
  return (
    <>
       <h1 className='text-white text-center text-3xl'>Password Generator</h1>
       <div className='text-xl h-90 w-[95%] text-yellow-500 bg-slate-900 shadow-md rounded-md my-8 mx-auto p-20'>
        <div className='flex  overflow-hidden'>
          <input type="text" 
          value={Password}
          className=' outline-none w-full px-4 py-2 rounded-tl-md rounded-bl-md'
          placeholder='Choose what you want and Generate your password'
          readOnly
          ref={passwordRef}
          />
          <button 
          className=' bg-yellow-400 text-white border-none hover:bg-yellow-600 rounded-tr-md rounded-br-md px-5 font-semibold'
          onClick={copyPasswordToClipboard}>Copy</button>
        </div>

        <div className=' flex items-center gap-x-2 my-4'>
          <input type="range"
          min={8}
          max={30}
          value={length}
          id='length'
          className='cursor-pointer ml-10'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label htmlFor="length" className='mx-4'>Length:{length}</label>
          <div className='flex items-center gap-x-2 mx-2'>
            <input type='checkbox'
            className='w-4 h-4'
            defaultChecked = {numberAllowed}
            id='inputNumber'
            onChange ={(e)=>{setNumberAllowed((prev)=> !prev);
            }}  />
            <label htmlFor="inputNumber">Numbers</label>
          </div>
          <div className='flex items-center gap-x-2 mx-2'>
            <input type='checkbox'
            className='w-4 h-4'
            defaultChecked = {characterAllowed}
            id='inputCharacter'
            onChange ={(e)=>{setCharacterAllowed((prev)=> !prev);
            }}  />
            <label htmlFor="inputCharacter">Characters</label>
          </div>
        </div>
        </div> 
    </>
  )
}

export default App
