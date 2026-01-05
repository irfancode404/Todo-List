import { useEffect, useState } from "react"
import { FaDeleteLeft } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdTextDecrease } from "react-icons/md";
import { MdOutlineDeleteSweep } from "react-icons/md";
const svaeitems = () => {
  let Gooddata = localStorage.getItem("items");
  if(Gooddata){
    return JSON.parse(Gooddata);
  }
  else{
    return [];
  }
}
const App = () => {
  const [input,setinput] = useState("");
  const [add,setadd] = useState(svaeitems()); // ["hii","go"]
  const [Toggale,setToggale] = useState(true);
  const [editid,setedit] = useState(null);

 const addList = () => {
  if(input.trim() === ""){
    alert("Add Text");
  }
  else{
    const myobject = {
      id : Date.now(),
      Value : input,
    } 
 /** Insert */  setadd([...add,myobject]);
    setinput("");
    // Edit Mode

    if(!Toggale){
       const Updated = add.map((items) => {
           if(items.id === editid){
            return {...items,Value : input}
           }
           else{
            return items
           }
        })
        setadd(Updated);
    }
    setToggale(true);
  }
 } 

 // delete list
 const Delete = (id) => {
   const remove = add.filter((text) => {
      return id !== text.id
   })
   setadd(remove);
 }

const Clearbyme = (myinput) => {
  const StringDelete = myinput.substring(0 , myinput.length - 1);
  setinput(StringDelete);
}

const AllRemoveData = () => {
  setadd([]);
}

// My Edit Code

const MyEdit = (myEditvalue,myid) => {
  console.log(myEditvalue);
  setToggale(false);
  setinput(myEditvalue);
  setedit(myid)
}

// All remove text
const Allremovetext = () => {
  if(input == ""){
    alert("Enter Todo");
  }
  else{
      setinput("");

  }
}
useEffect(() => {
  localStorage.setItem("items", JSON.stringify(add))
},[add])

  return(
    <>
    <h1 className="font-Go text-center text-4xl m-10 text-green-400">Hii Wellcome to Todo List</h1>
    <div className="border-0 flex justify-center items-center ml-5 sm:flex sm:justify-between sm:items-center">
    <input type="text" className="sm:m-2 p-5 border-2 w-30 h-20 rounded-md  text-1xl sm:text-3xl sm:w-390" value={input} onChange={(e) => setinput(e.target.value)} placeholder="Enter Todo"/>
    <button className=" ml-2 border-2 cursor-pointer h-20 w-20 sm:w-23 text-black font-bold rounded-md flex justify-center items-center text-4xl" onClick={() => addList()}>{Toggale ? <IoAdd /> : <FaRegEdit />}</button>
     <button className="ml-2  border-2 w-15 sm:w-23 h-21 border-black rounded-md text-black text-4xl  cursor-pointer active:text-black flex justify-center items-center p-4" onClick={() => Clearbyme(input)}><FaDeleteLeft /></button>
     <button className="ml-2 text-red-500 active:text-red-400 cursor-pointer w-15 sm:w-23 flex justify-center items-center text-6xl h-21 mr-5 rounded-md border-black border-2 p-4" onClick={() => Allremovetext()}><MdTextDecrease /></button>
    </div>
    {add.map((data) => {
      return(
        <>
          <div key={data.id} className="h-20 m-5 flex justify-between items-center border-b-2">
             <div className="overflow-auto border-0 p-5">
               <span className="m-3 font-Go pl-2">{data.Value}</span>
             </div>
           <span className="border-0 w-40 h-15 flex justify-center items-center gap-3">
                    
                <button className="border-0 w-15 h-10 bg-red-500 text-white rounded-md cursor-pointer active:bg-red-400" onClick={() => Delete(data.id)}>Clear</button>
                <button className="text-white bg-green-400 rounded-md w-15 h-10 cursor-pointer active:bg-green-300" onClick={() => MyEdit(data.Value,data.id)}>Edit</button><br />
          
           </span>
             </div>
        </>
      )
    })}
     <button className="border-2 w-30 rounded-md h-20 m-5 cursor-pointer flex justify-center items-center text-5xl text-white bg-red-500" onClick={() => AllRemoveData()}><MdOutlineDeleteSweep /></button>
    </>
  )
}

export default App