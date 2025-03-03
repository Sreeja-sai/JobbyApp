// import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import './index.css'

const JobsHeader = props => {
  const {changeSearchInput, activeSearchInput, searchIconInputClick} = props
  const changeSearchInputClick = event => {
    changeSearchInput(event.target.value)
  }
  const searchIconBtnClick = () => {
    searchIconInputClick()
  }
  return (
    <ul className="searchInputContainer">
      <li>
        <input
          type="search"
          onChange={changeSearchInputClick}
          className="searchInput"
          value={activeSearchInput}
        />
      </li>
      <li>
        <button
          onClick={searchIconBtnClick}
          className="searchBtn"
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </li>
    </ul>
  )
}

export default JobsHeader
