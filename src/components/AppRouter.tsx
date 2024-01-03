import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from '../pages/main/main'
import { Login } from '../pages/login'
import {Navbar} from "../components/navbar"
import { CreatePost } from '../pages/create-post/create-post';
import { ChatPage } from '../pages/chat/chat-page';
import { SettingsPage } from '../pages/chat/settings';


export const AppRouter: React.FunctionComponent = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path= "/" element ={<Main />} />
                <Route path= "/login" element ={<Login />} />
                <Route path= "/createpost" element ={<CreatePost />} />
                <Route path= "/chat" element ={<ChatPage />} />
                <Route path= "/settings" element ={<SettingsPage />} />
            </Routes>
      </Router>
    );
  };
  
  export default AppRouter;