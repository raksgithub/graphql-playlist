import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';

// Components
import Books from './containers/Books';
import AddBook from './containers/AddBook';

// Static files

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';

// SCSS
import './styles/scss/main.scss';

function App() {
  return (
    <div className='container'>
      <Router history={history}>
        <Switch>
          <Route path='/books' exact component={Books} />
          <Route path='/addBook' exact component={AddBook} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
