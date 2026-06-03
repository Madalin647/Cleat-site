import {Route,Routes} from "react-router-dom"
import MainPage from "./Pages/MainPage"
import './App.css'
import './textStyles.css'

function App() {


  return (
   <Routes>
    <Route index element={<MainPage/>}   />
   </Routes>
  )
}

export default App
