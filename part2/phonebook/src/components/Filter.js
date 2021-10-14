const Filter = ({ filter }) => {

    const nameFilter = filter.state 
    const nameFilterSetter = filter.setter

    const filterChangeHandler = (event) => {
      const filterValue = event.target.value
  
      console.log('Current filter: ', filterValue)
      nameFilterSetter(filterValue)
    }

    return (
      <form>
        <div>
          {'Filter shown with: '}
          <input 
            onChange={filterChangeHandler}
            value={nameFilter}
          />
        </div>
      </form>
    )
  }

export default Filter