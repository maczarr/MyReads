import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShowBook from './ShowBook'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class MyBooks extends Component {
  static propTypes = {
    onSwitchShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    shelves: PropTypes.object.isRequired
  }

  // Function for handling a book switching shelves
  handleChange = (book,shelf) => {
    this.props.onSwitchShelf(book,shelf)
  }

  render() {
    const { books, shelves } = this.props

    /*
     * Collecting all data about shelves so there is no need to repeat
     * HTML for building the shelves
     */
    const shelvesMeta = [
      {
        "label" : "Currently Reading",
        "shelf" : "currentlyReading",
        "books" : shelves.currentlyReading
      },
      {
        "label" : "Want To Read",
        "shelf" : "wantToRead",
        "books" : shelves.wantToRead
      },
      {
        "label" : "Read",
        "shelf" : "read",
        "books" : shelves.read
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {/* These iterations are used to build the three shelves */}
          {shelvesMeta.map((s,i) => (
            <div className="bookshelf" key={i}>
              <h2 className="bookshelf-title">{s.label} ({s.books.length})</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/*
                    * The books get filtered so only the books in this shelf
                    * are left. After that the resulting books are getting
                    * sorted by title so they are everytime in the same order.
                    * Last step is an iteration over the sorted books where
                    * every book gets handed over to the ShowBook-Component,
                    * which needs a function for handling books switching shelf,
                    * the book itself and the shelf it is in, so the dropdown
                    * can show the correct current shelf.
                    */}
                  {books.filter((b) => {
                    return (s.books.indexOf(b.id) > -1)
                  }).sort(sortBy('title')).map((book) => (
                    <li key={book.id}>
                      <ShowBook
                        onHandleChange={(book,shelf) => {
                          this.handleChange(book,shelf)
                        }}
                        book={book}
                        shelf={s.shelf}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBooks
