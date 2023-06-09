import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  due_date: string;
}

interface CustomModalProps {
  activeItem: Todo;
  toggle: () => void;
  onSave: (item: Todo) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  activeItem,
  toggle,
  onSave,
}) => {
  const [item, setItem] = useState<Todo>(activeItem);

  useEffect(() => {
    setItem(activeItem);
  }, [activeItem]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setItem({ ...item, [name]: newValue });
  };

  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>Todo Item</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="todo-title">Title</Label>
            <Input
              type="text"
              id="todo-title"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Description</Label>
            <Input
              type="text"
              id="todo-description"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </FormGroup>
          <FormGroup>
            <Label for="todo-description">Priority</Label>
            <Input
              type="text"
              id="todo-priority"
              name="priority"
              value={item.priority}
              onChange={handleChange}
              placeholder="Enter priority"
            />
          </FormGroup>
          <FormGroup>
            <Label for="due-date">Due Date</Label>
            <Input
              type="date"
              id="todo-due-date"
              name="due_date"
              value={item.due_date}
              onChange={handleChange}
              // placeholder="mm/dd/yyyy"
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="completed"
                checked={item.completed}
                onChange={handleChange}
              />
              Completed
            </Label>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSave(item)}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CustomModal;
