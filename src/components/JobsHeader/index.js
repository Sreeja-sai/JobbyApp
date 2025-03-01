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
    <div className="searchInputContainer">
      <div>
        <input
          type="text"
          onChange={changeSearchInputClick}
          className="searchInput"
          value={activeSearchInput}
        />
      </div>
      <div>
        <button
          onClick={searchIconBtnClick}
          className="searchBtn"
          type="button"
          data-testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    </div>
  )
}

export default JobsHeader
