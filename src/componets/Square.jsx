export const Square = ({children,isSelected, updateBoard, row,col})=>{
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () =>{
      updateBoard(row,col)
    }
    return(
    <div onClick={handleClick} className={className}>
        {children} 
      </div>
    )
  }