import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import client from './graphql/ApolloClient';
import { ApolloProvider } from 'react-apollo';

// Components
import Books from './containers/Book/Books';
import AuthorContainer from './containers/Author';
import AddBook from './containers/Book/AddBook';
import AddAuthor from './containers/Author/AddAuthor';
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
                            <Route path='/authors' exact component={AuthorContainer} />
                            <Route path='/addAuthor' exact component={AddAuthor} />
                        </div>
                    </Switch>
                </Router>
            </ApolloProvider>
        </div>
    );
}

export default App;
