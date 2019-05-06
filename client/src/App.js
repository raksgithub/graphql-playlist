import React from 'react';
import Books from './containers/Books';
import AddBook from './containers/AddBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className='container'>
      <h2>Book List</h2>
      <hr />
      <Books />
      <AddBook />
    </div>
  );
}

export default App;
