import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FavoriteCoinsList from './views/favoritePage/favoriteCoinsList';
import Login from './views/loginPage/login';
import Register from './views/registerPage/register';
import Home from './views/homePage/home';
import NewsFeed from './views/newsPage/newsFeed';
import ProfileEdit from './views/profilePage/profileEdit';
import Trending from './components/Trending';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favoritecoins" element={<FavoriteCoinsList />} />
        <Route path="/news" element={<NewsFeed />} />
        <Route path="/editprofile" element={<ProfileEdit />} />
        <Route path="/trend" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
