import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './Components/Home/Home'
function App() {
  return (
    <Router>
      <div>
        <Home/>
      </div>
    </Router>
  );
}

export default App;
