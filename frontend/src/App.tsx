import React, { useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import "devextreme/dist/css/dx.light.css";
import { TextBox } from "devextreme-react/text-box";
import { Button } from "devextreme-react/button";
import { List } from "devextreme-react/list";

interface TodoItem {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  due_date: string;
}

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
  const [filteredItems, setFilteredItems] = useState<TodoItem[]>([]);

  useEffect(() => {
    refreshList();
  }, []);

  const handleSearch = (e: any) => {
    const value = e.value;
    setSearchValue(value);

    const filtered = todoList.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredItems(filtered);
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

  const renderTabList = () => {
    return (
      <>
        <div className="nav nav-tabs">
          <span
            onClick={() => displayCompleted(true)}
            className={viewCompleted ? "nav-link active" : "nav-link"}
          >
            Complete
          </span>
          <span
            onClick={() => displayCompleted(false)}
            className={viewCompleted ? "nav-link" : "nav-link active"}
          >
            Incomplete
          </span>
        </div>
      </>
    );
  };

  const renderItems = () => {
    const items = searchValue.length > 0 ? filteredItems : todoList;
    const newItems = items.filter((item) => item.completed === viewCompleted);

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.title}
        >
          {item.title}
        </span>
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.description}
        >
          {item.description}
        </span>
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.priority}
        >
          {item.priority}
        </span>
        <span
          className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`}
          title={item.due_date}
        >
          {item.due_date}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
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
                      <TextBox
                        value={searchValue}
                        onValueChanged={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="dx-field">
                    <div className="dx-field-value">
                      <Button text="Clear" onClick={() => setSearchValue("")} />
                    </div>
                  </div>
                </div>
                <List dataSource={filteredItems} />
              </div>
              {renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {renderItems()}
              </ul>
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
