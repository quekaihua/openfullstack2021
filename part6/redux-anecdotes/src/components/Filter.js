import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'
import React from 'react'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterChange(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
        filter <input onChange={handleChange} value={props.filter}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  filterChange
}
const connectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default connectedFilter