import logo from './logo.svg';
import './App.css';
import Accueil from './components/Accueil';
import { Provider } from 'react-redux';
import { store } from './redux';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Accueil />
        </header>
      </div>
    </Provider>
  );
}

export default App;
