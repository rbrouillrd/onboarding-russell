import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "devextreme/dist/css/dx.light.css";
import { Button } from "devextreme-react/button";
import { TodoItem } from "./types";
import SearchBox from "./components/SearchBox";
import TabList from "./components/TabList";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState<TodoItem>({
    title: "",
    description: "",
    completed: false,
    priority: "",
    due_date: "",
  });

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("title");
  const [sortOrder, setSortOrder] = useState<boolean>(false);

  useEffect(() => {
    refreshList();
  }, []);

  const handleSearch = (e: any) => {
    const value = e.value;

    setSearchValue(value);

    const sort_by = sortOrder ? sortValue : -sortValue

    axios
      .get(`http://localhost:8000/api/todos/?search=${value}&sort_by=${sortValue}`)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = (item: TodoItem) => {
    toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/todos/", item)
      .then((res) => refreshList());
  };

  const handleDelete = (item: TodoItem) => {
    axios
      .delete(`http://localhost:8000/api/todos/${item.id}/`)
      .then((res) => refreshList());
  };

  const createItem = () => {
    const item: TodoItem = {
      title: "",
      description: "",
      completed: false,
      priority: "",
      due_date: "",
    };

    setActiveItem(item);
    toggle();
  };

  const editItem = (item: TodoItem) => {
    setActiveItem(item);
    toggle();
  };

  const displayCompleted = (status: boolean) => {
    setViewCompleted(status);
  };

  const handleSort = (e: any) => {
    const value = e.value;

    console.log(e)

    setSortValue(value);
  };

  const handleSortOrder = () => {
  
    console.log(!sortOrder);
    setSortOrder(!sortOrder);
  };

  return (
    <>
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={createItem}>
                  Add task
                </button>
                <div className="dx-fieldset">
                  <div className="dx-field">
                    <div className="dx-field-label">Search:</div>
                    <div className="dx-field-value">
                      <SearchBox
                        searchValue={searchValue}
                        handleSearch={handleSearch}
                        sortValue={sortValue}
                        handleSort={handleSort}
                        sortOrder={sortOrder}
                        handleSortOrder={handleSortOrder}
                      />
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-value">
                      <Button text="Clear" onClick={() => refreshList()} />
                    </div>
                  </div>
                </div>
                <TabList
                  viewCompleted={viewCompleted}
                  displayCompleted={displayCompleted}
                />
                <TaskList
                  todoList={todoList}
                  viewCompleted={viewCompleted}
                  editItem={editItem}
                  handleDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
        {modal ? (
          <Modal
            activeItem={activeItem}
            toggle={toggle}
            onSave={handleSubmit}
          />
        ) : null}
      </main>
    </>
  );
};

export default App;
