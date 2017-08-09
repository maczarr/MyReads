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

  handleChange = (book,shelf) => {
    this.props.onSwitchShelf(book,shelf)
  }

  clearBookList() {
    this.setState({ listOfBooks: [] })
  }

  handleSearch = (query) => {
    if(query.length > 0) {
      BooksAPI.search(query,20).then((listOfBooks) => {
        if(!listOfBooks.error) {
          this.setState({ listOfBooks })
        }
        else {
          this.clearBookList();
        }
      })
    }
    else {
      this.clearBookList();
    }
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
