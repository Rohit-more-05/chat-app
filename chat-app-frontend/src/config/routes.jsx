import {Routes,Route } from 'react-router'
import App from '../App.jsx'
import ChatPage from '../components/ChatPage.jsx'

const AppRoutes = () => {
    return ( 

    <Routes>

      <Route path="/" element={<App/>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/jsx" element={<h1>This is chat page</h1>} />
      <Route path="*" element={<h1>404 page not found</h1>}/>

    </Routes>
    
    )
}

export default AppRoutes;