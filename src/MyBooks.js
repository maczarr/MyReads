import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShowBook from './ShowBook'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class MyBooks extends Component {
  static propTypes = {
    onSwitchShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.object.isRequired
  }

  handleChange = (book,shelf) => {
    this.props.onSwitchShelf(book,shelf)
  }

  render() {
    const { books, shelfs } = this.props

    const shelfsMeta = [
      {
        "label" : "Currently Reading",
        "shelf" : "currentlyReading",
        "books" : shelfs.currentlyReading
      },
      {
        "label" : "Want To Read",
        "shelf" : "wantToRead",
        "books" : shelfs.wantToRead
      },
      {
        "label" : "Read",
        "shelf" : "read",
        "books" : shelfs.read
      }
    ]

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {shelfsMeta.map((s,i) => (
            <div className="bookshelf" key={i}>
              <h2 className="bookshelf-title">{s.label} ({s.books.length})</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
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