import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import client from './graphql/ApolloClient';
import { ApolloProvider } from 'react-apollo';

// Components
import Books from './containers/Books';
import AddBook from './containers/AddBook';
import LandingPage from './components/LandingPage';
import AppNavBar from './components/common/AppNavBar';

// Static files

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';

// SCSS
import './styles/scss/main.scss';

function App() {
    console.log('Apollo Client=>>', client);
    return (
        <div>
            <ApolloProvider client={client}>
                <Router history={history}>
                    <AppNavBar />
                    <Switch>
                        <div className='container'>
                            <Route path='/' exact component={LandingPage} />
                            <Route path='/books' exact component={Books} />
                            <Route path='/addBook' exact component={AddBook} />
                        </div>
                    </Switch>
                </Router>
            </ApolloProvider>
        </div>
    );
}

export default App;
