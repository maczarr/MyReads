import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ShowBook from './ShowBook'
import PropTypes from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const { books } = this.props

    let booksCurrently = books.filter((book) => book.shelf === 'currentlyReading')
    let booksWantTo    = books.filter((book) => book.shelf === 'wantToRead')
    let booksRead      = books.filter((book) => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksCurrently.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksWantTo.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {booksRead.map((book) => (
                    <li key={book.id}>
                      <ShowBook book={book}/>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks