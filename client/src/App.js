import logo from './logo.svg';
import './App.css';
import HomeDictionary from './pages/homeDictionary/HomeDictionary';
import { connect } from 'react-redux';
function App() {
  return (
    <>
      <HomeDictionary />
    </>
  );
}

export default connect()(App)
