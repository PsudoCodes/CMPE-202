import logo from './logo.svg';
import './App.css';
import SignIn from './SignIn';
import Checkout from './Checkout';
import { Route, Router, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import SignInSide from './SignInSide';
import Album from './Album';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import EmployeeView from './EmployeeView';
import EmployeeSearchForm from './EmployeeSearchForm';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="App">
      <Route path="/signin1">
        <SignIn />
      </Route>
      <Route path="/signin">
        <SignInSide />
      </Route>

      {/* <Routes> */}
      <Route path="/checkout">
        <Checkout />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/mybookings">
        <Album />
      </Route>
      <Route path="/search">
        <SearchForm />
      </Route>
      <Route path="/searchemployee">
        <EmployeeSearchForm />
      </Route>
      <Route path="/searchresults">
        <SearchResults />
      </Route>
      <Route path="/employee">
        <EmployeeView />
      </Route>
      {/* </Routes> */}
      {/* <Routes> */}
      {/* <Route path="">
        <SignIn />
      </Route> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
// "react-router-dom": "^6.0.2",