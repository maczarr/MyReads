import React from 'react'
import { Route } from 'react-router-dom'
import MyBooks from './MyBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
    shelfs : {
      "currentlyReading": [],
      "wantToRead"      : [],
      "read"            : []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({
        shelfs : {
          "currentlyReading": books.filter((book) => book.shelf === 'currentlyReading').map((book) => book.id),
          "wantToRead"      : books.filter((book) => book.shelf === 'wantToRead').map((book) => book.id),
          "read"            : books.filter((book) => book.shelf === 'read').map((book) => book.id)
        }
      })
    })
  }

  switchShelf(book,shelf) {
    BooksAPI.update(book,shelf).then((shelfs) => {
      this.setState({ shelfs })

      if(shelf === 'none') {
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id)
        }))
      } else {
        const bookInLib = this.state.books.filter((b) => { return (b.id === book.id) })

        if(bookInLib.length === 0) {
          this.setState((state) => ({
            books: state.books.concat([ book ])
          }))
        }
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks
            onSwitchShelf={(book,shelf) => {
              this.switchShelf(book,shelf)
            }}
            books={this.state.books}
            shelfs={this.state.shelfs}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            onSwitchShelf={(book,shelf) => {
              this.switchShelf(book,shelf)
            }}
            shelfs={this.state.shelfs}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
