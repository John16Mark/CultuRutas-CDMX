import logo from './logo.svg';
import './App.css';

import AppRouter from './routes/AppRouter';

function App() {
  return (
    
    <div>
      {/*<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>*/}
      <AppRouter />
    </div>
  );
}

export default App;
