import React from 'react'
import { Route } from 'react-router-dom'
import MyBooks from './MyBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books : [],
    shelves : {
      "currentlyReading": [],
      "wantToRead"      : [],
      "read"            : []
    }
  }

  componentDidMount() {
    /*
     * Filling the state variables with initial data from the API
     * The shelves get constructed in this exact way because it's the same
     * format as the API-response after updating a book.
     */
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({
        shelves : {
          "currentlyReading": books.filter((book) => book.shelf === 'currentlyReading').map((book) => book.id),
          "wantToRead"      : books.filter((book) => book.shelf === 'wantToRead').map((book) => book.id),
          "read"            : books.filter((book) => book.shelf === 'read').map((book) => book.id)
        }
      })
    })
  }

  /*
   * This function handles all interactions with books:
   * - Book switches from one shelf to another
   * - Book gets added to a shelf after search
   * - Book gets removed from a shelf (and not added to another one)
   *
   * After the API-Update-Call worked the state gets updated with the
   * new responded shelves-Object.
   * If the shelf was removed ('none') the 'books'-state gets updated.
   * If the book was added to a shelf it's getting checked if the book
   * was in library before (book switched shelves) or if it is new to the
   * users library so the 'books'-state needs to be updated and the book
   * gets added.
   */
  switchShelf(book,shelf) {
    BooksAPI.update(book,shelf).then((shelves) => {
      this.setState({ shelves })

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

  // The two possible sites are getting configured with routes
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <MyBooks
            onSwitchShelf={(book,shelf) => {
              this.switchShelf(book,shelf)
            }}
            books={this.state.books}
            shelves={this.state.shelves}
          />
        )}/>

        <Route exact path="/search" render={() => (
          <SearchBooks
            onSwitchShelf={(book,shelf) => {
              this.switchShelf(book,shelf)
            }}
            shelves={this.state.shelves}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
