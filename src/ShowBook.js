import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShowBook extends Component {
  static propTypes = {
    onHandleChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired
  }

  // Function for handling a book switching shelfs
  handleChange = (book,shelf) => {
    this.props.onHandleChange(book,shelf)
  }

  render() {
    const { book, shelf } = this.props

    /*
     * Because some books don't have thumbnails or authors or sometimes
     * they have more than one author, this gets checked here.
     */
    const bookImage = book.imageLinks ? book.imageLinks.thumbnail : ''
    const authors   = book.authors ? book.authors.join(', ') : ''

    // The HTML for a single book gets built and the shelf gets set
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookImage})` }}></div>
          <div className="book-shelf-changer">
            <select value={shelf} onChange={(event) => this.handleChange(book,event.target.value)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    )
  }
}

export default ShowBook
