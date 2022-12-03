import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CurrencyCard from './Components/CurrencyCard';
import Navbar from './Components/Navbar';


function App() {

  return (
    <div className="App">
       <Navbar/>
      <header className="App-header">
        <CurrencyCard/>
      </header>
    </div>
  );
}

export default App;
