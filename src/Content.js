import React from 'react'
import './Content.css';
import ItemList from './ItemList';

const Content = ({items,handleCheck,handleDelete}) => {

    // when clicking button name randomly changed
    // const [namee,setName] = useState("Dinesh")

    // function nameFromFunction(){
    //     const names = ["Dinesh","Deepak","Divya"]
    //     const int = Math.floor(Math.random()*3)
    //     setName(names[int])
    // }
    //end name changing
    
    //increment & decrement function
    // const [count,setCount] = useState(50)
    // function incrementFunction(){
    //     setCount(preCount => preCount + 1)
    // }
    // function decrementFunction(){
    //     setCount(preCount => preCount - 1)
    // }
    //end increment & decrement
    
    // when clicking shows something
    // const handleClick = (e) => {
    //     console.log(e.target.innerText);
    // }
    // const handleClick2 = (name) => {
    //     console.log(`Thanks for clicking me !! ${name}`);
    // }
    //ending
    
  return (
    <>
        {(items.length) ? (
            <ItemList 
                items={items}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />
        ):(
            <p style={{marginTop:'2rem'}}>Your list is Empty</p>
        ) 
    }   
        {/* <button onClick={decrementFunction}>-</button> */}
        {/* <span>{count}</span> */}
        {/* <button onClick={incrementFunction}>+</button> */}
        {/* <p>Hello{namee}</p> */}
        {/* <button onClick={nameFromFunction}>click</button> */}
    </>
  )
}

export default Content