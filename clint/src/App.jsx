import  { Routes, Route } from 'react-router-dom'


function App() {
  

  return (
    <>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/add' element={<AddNote/>}/>
     <Route path='/edit-note/:_id' element={<EditNote/>}/>
     </Routes>
    </>
  )
}

export default App
