import React, { useState } from 'react'
import AddNote from '../pages/AddNote';


function Header() {

 const [showModel , setShowModel] = useState(false);

  return (
     <div className=" flex items-center bg-neutral-950 border-b border-neutral-800 p-4 space-x-4 h-[90px]">
  <h1 className="text-xl font-bold text-neutral-100  tracking-wide">Note</h1>
  <div className="flex-1 flex justify-end space-x-4">

  
<button className="px-4 py-2 rounded-md text-neutral-100 
border border-neutral-500 hover:bg-neutral-800 
hover:border-neutral-300 transition" onClick={() => setShowModel(true)}>
Create note 
</button>
 { showModel && <AddNote onClose={() => setShowModel(false)}/>}
  </div>
 </div>
  )
}

export default Header
