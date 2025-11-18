import  { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddNote from './pages/AddNote.jsx'
import EditNote from './pages/EditNote.jsx'
import Header from './components/Header.jsx'

function App() {
  

  return (
    <>
    <Header/>
     <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/add' element={<AddNote/>}/>
     <Route path='/edit-note/:_id' element={<EditNote/>}/>
     </Routes>
    </>
  )
}

export default App
