import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import client from './graphql/ApolloClient';
import { ApolloProvider } from 'react-apollo';

// Components
import Books from './containers/Book/Books';
import AuthorContainer from './containers/Author';
import AddBook from './containers/Book/AddBook';
import AddAuthor from './containers/Author/AddAuthor';
import LandingPage from './components/LandingPage';
// import AppNavBar from './components/common/AppNavBar';
import SideBar from './components/common/SideBar';

// Static files

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './styles/css/App.css';

// SCSS
import './styles/scss/main.scss';

const App = () => {
    return (
        <div>
            <ApolloProvider client={client}>
                <Router history={history}>
                    {/* <AppNavBar /> */}
                    <SideBar />
                    <div className="container">
                        <Switch>
                            <Route path='/' exact component={LandingPage} />
                            <Route path='/books' exact component={Books} />
                            <Route path='/addBook' exact component={AddBook} />
                            <Route path='/authors' exact component={AuthorContainer} />
                            <Route path='/addAuthor' exact component={AddAuthor} />
                        </Switch>
                    </div>
                </Router>
            </ApolloProvider>
        </div>
    );
}

export default App;
