import Navbar from "./Components/Navbar"
import Body from "./Components/Body"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { Provider } from "react-redux"
import store from "./utils/store"
import Feed from "./Components/Feed"
import Connections from "./Components/Connections"
import Requests from "./Components/Requests"
import ProtectedRoute from "./Routes/ProtectedRoute"
import Error from "./Components/Error"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<Body/>}>
        <Route path={'/login'} element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
        <Route path={'/feed'} element={<Feed/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/connections'} element={<Connections/>}/>
        <Route path={'/requests'} element={<Requests/>}/>
        </Route>
      </Route>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
