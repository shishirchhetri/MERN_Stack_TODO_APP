import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Preloader from "./components/Preloader";
import ButtonWithLoading from "./components/Loader";

function App() {
  const [itemText, SetItemText] = useState("");
  const [listItems, SetListItems] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  //for toastify notification
  const notifyErr = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  //adding new item to the TODO App
  const addItem = async (e) => {
    e.preventDefault();
    try {
      SetIsLoading(true);
      const res = await axios.post("http://localhost:8000/api/item", {
        item: itemText,
      });
      SetIsLoading(false);

      //validation for empty list
      if (itemText === "") {
        notifyErr("Please fill in the form.");
        return;
      }
      SetListItems((pre) => [...pre, res.data]);
      notifySuccess("Successfully added to the list.");
      SetItemText("");
    } catch (err) {
      console.log(err);
      notifyErr("Failed!, check console.");
    }
  };

  //get all the items stored in the db
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.post("http://localhost:8000/api/items");
        SetListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  //delete item list in the app
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/item/${id}`);
      notifySuccess("Deletion success!!");
      const newListItem = listItems.filter((item) => item._id !== id);
      SetListItems(newListItem);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="app">
        <div className="App-container">
          <h1>Todo List</h1>
          <form className="form" onSubmit={(e) => addItem(e)}>
            <input
              type="text"
              placeholder="Add Todo Item"
              onChange={(e) => {
                SetItemText(e.target.value);
              }}
              value={itemText}
            />
            <button type="submit" >{
          isLoading ? (<Preloader className='loader'/>) : ("Add")}</button>
          
          </form>
          <div className="todo-listItems">
            <h2 className="list-title">Todo lists</h2>
            {listItems.map((item) => {
              return (
                <div className="todo-item" key={item._id}>
                  <p className="item-content">{item.item}</p>
                  <button className="update-item">Update</button>
                  <button
                    className="delete-item"
                    onClick={() => deleteItem(item._id)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
