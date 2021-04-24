import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Page from './components/Page';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Page} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
