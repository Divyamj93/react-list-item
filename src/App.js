import logo from './logo.svg';
import './App.css';
import Header  from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react'; //hooks
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import ApiRequest from './ApiRequest';

function App() {
  const API_URL ='http://localhost:3500/items';
  const [items,setItems] = useState([]);

  const [newItem,setNewItem] = useState('')
  const [search, setSearch] = useState('')
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // JSON.parse(localStorage.getItem('todo_list'))

  useEffect(() => {
      const fetchItems = async () => {
        try {
              const response = await fetch(API_URL);
              if(!response.ok) throw Error("Data not received");
              const listItems = await response.json();
              setItems(listItems);
              setFetchError(null)
        } catch(err) {
              setFetchError(err.message)
        } finally {
           setIsLoading(false)
        }
      }
      setTimeout(() => {
      (async () => await fetchItems())()
      },2000)
  },[])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = {id, checked:false, item}
    const listItems = [...items, addNewItem]
    setItems(listItems)

    const postOptions = {
      method:'POST',
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(addNewItem)
    }
    const result = await ApiRequest(API_URL, postOptions)
    if(result) setFetchError(result)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
  }

const handleCheck = async (id) => {
    const listItems =items.map((item) => 
        item.id===id ? {...item, checked:!item.checked} : item)
    setItems(listItems)

    const myItem =listItems.filter((item) =>item.id === id)
    const updateOptions = {
      method:'PATCH',
      header:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await ApiRequest(reqUrl, updateOptions)
    if(result) setFetchError(result)
    // localStorage.setItem("todo_list", JSON.stringify(listItems))
}
const handleDelete = async(id) => {
    const deleteItems =items.filter((item)=>
    item.id!==id)
    setItems(deleteItems)

    const deleteOptions = {
      method:'DELETE'
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await ApiRequest(reqUrl, deleteOptions)
    if(result) setFetchError(result)
    // localStorage.setItem("todo_list", JSON.stringify(deleteItems))
}
const handleSubmit = (e) => {
  e.preventDefault()
  if(!newItem) return;
  addItem(newItem)
  setNewItem('')
  console.log('submitted');
}

  return (
    // <div className="App">
      // <header className="App-header">
        // <img src={logo} className="App-logo" alt="logo" />
        // <p>
          // Edit <code>src/App.js</code> and save to reload.
        // </p>
        // <a
          // className="App-link"
          // href="https://reactjs.org"
          // target="_blank"
          // rel="noopener noreferrer"
        // >
          // Learn React
        // </a>
         <div className="App">
             <Header title="Course List"/>
             <AddItem 
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
             />
             <SearchItem
                search={search}
                setSearch={setSearch}
             />
             <main>
                {isLoading && <p>Loading items...... </p>}
                {fetchError && <p> {`Error: ${fetchError}`}</p>}
                {!isLoading && !fetchError && <Content items={items.filter(item =>
                  ((item.item).toLowerCase()).includes(search.toLowerCase())
                )}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}/>}
              </main>
             <Footer 
                length={items.length} />
          </div>
        // </header>
    // </div>
  );
}

export default App;
