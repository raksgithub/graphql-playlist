import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import client from './graphql/ApolloClient';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { store } from './store';

// Components
import Books from './containers/Book/Books';
import AuthorContainer from './containers/Author';
import AddBook from './containers/Book/AddBook';
import EditBook from './containers/Book/EditBook';
import AddAuthor from './containers/Author/AddAuthor';
import LandingPage from './components/LandingPage';
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
                <Provider store={store}>
                    <Router history={history}>
                        <SideBar />
                        <div className="container">
                            <Switch>
                                <Route path='/' exact component={LandingPage} />
                                <Route path='/books' exact component={Books} />
                                <Route path='/addBook' exact component={AddBook} />
                                <Route path='/editBook/:id' exact component={EditBook} />
                                <Route path='/authors' exact component={AuthorContainer} />
                                <Route path='/addAuthor' exact component={AddAuthor} />
                            </Switch>
                        </div>
                    </Router>
                </Provider>
            </ApolloProvider>
        </div>
    );
}

export default App;
