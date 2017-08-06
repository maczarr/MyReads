import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  switchShelf(book,shelf) {
    BooksAPI.update(book,shelf)
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            onSwitchShelf={(book,shelf) => {
              this.switchShelf(book,shelf)
            }}
            books={this.state.books}
          />
        )}/>

        <Route exact path="/search" render={({ history }) => (
          <SearchBooks />
        )}/>
      </div>
    )
  }
}

export default BooksApp
