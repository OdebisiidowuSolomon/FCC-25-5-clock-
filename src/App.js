import {
  Routes,
  Route} from 'react-router-dom';
import './App.css';
import Currency from './currency';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:curr" element={<Currency />} />
      </Routes>
    </div>
  );
}

export default App;
