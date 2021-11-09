const Notification = ({ message, className }) => {
  if (message === null) return null
  
  if (className === "error") {
    return (
      <div className={className}>
        {message}
      </div>
    )
  } else {
    return ( 
      <div className={className}>
        {message}
      </div>
    )
  }
}

export default Notification