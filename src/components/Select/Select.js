import React from 'react'

const Select = ({options}) => {
  return (
    <div>
        <label>sort by:</label>
        <select  name= "sort"onChange={options}>
            <option value=""></option>
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="repositories">Repositories</option>
        </select>
    </div>
  )
}

export default Select