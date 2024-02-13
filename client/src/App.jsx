import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Projects from './pages/projects';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Header from './components/header';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
