import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ShowBook from './ShowBook'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  static propTypes = {
    onSwitchShelf: PropTypes.func.isRequired,
    shelfs: PropTypes.object.isRequired
  }

  state = {
    listOfBooks: []
  }

  // Function for handling a book switching shelfs
  handleChange = (book,shelf) => {
    this.props.onSwitchShelf(book,shelf)
  }

  // Clearing the list of books, e.g. when none was found
  clearBookList() {
    this.setState({ listOfBooks: [] })
  }

  /*
   * Function handling all search-interactions
   *
   * If the search query is empty no search will be triggered and the list of
   * books will be cleared.
   *
   * Is there a valid query the BooksAPI gets called and the result updates
   * the 'listOfBooks'-state or when an error gets responded list of books
   * will be cleared.
   */
  handleSearch = (query) => {
    if(query.length === 0) {
      this.clearBookList();
      return;
    }

    BooksAPI.search(query,20).then((listOfBooks) => {
      if(listOfBooks.error) {
        this.clearBookList();
        return;
      }

      this.setState({ listOfBooks })
    })
  }

  render() {
    const { listOfBooks } = this.state
    const { shelfs } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.handleSearch(event.target.value)}
            />
          </div>
        </div>
        {/*
          * The list of books are getting sorted by title so they're everytime
          * in the same order.
          * For each book the ShowBook-Component is getting used. To handle over
          * the correct shelf the book is in (users library) the shelfs are
          * getting searched if the book.id is already there.
          */}
        <div className="search-books-results">
          <ol className="books-grid">
            {listOfBooks.sort(sortBy('title')).map((book) => (
              <li key={book.id}>
                <ShowBook
                  onHandleChange={(book,shelf) => {
                    this.handleChange(book,shelf)
                  }}
                  book={book}
                  shelf={((book) => {
                    if(shelfs.currentlyReading.indexOf(book.id) > -1) return 'currentlyReading'
                    if(shelfs.wantToRead.indexOf(book.id) > -1) return 'wantToRead'
                    if(shelfs.read.indexOf(book.id) > -1) return 'read'
                    return 'none'
                  })(book)}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
