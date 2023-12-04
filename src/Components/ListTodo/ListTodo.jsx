import PropTypes from 'prop-types';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemTodo from "../ItemTodo/ItemTodo";
import AddTask from "../AddTask/AddTask"
import ReactPaginate from "react-paginate";
import { tasks } from "../../redux/actions";
import "./ListTodo.scss";
import "../AddTask/AddTask.scss";

// Const for the number of tasks on one page
const PAGE_SIZE = 5;

const ListTodo = () => {
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);
  const [currentPage, setCurrentPage] = useState(0);

  
  useEffect(() => {
    // Request data from the server
    const getItem = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
      // Convert data to JSON format
      const data = await res.json();
      dispatch(tasks(data));
    };
    getItem();
  }, [dispatch]);
// Page change handler in pagination
   const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
// Selecting tasks for the current page
  const paginatedTodos = task.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div >
<AddTask/>
      <ul className="itemTodo_container">
        {/* Displaying tasks using the ItemTodo component */}
        {paginatedTodos.map((task) => (
          task && <ItemTodo key={task.id} todo={task} />
        ))}
      </ul>
      {/* Pagination */}
      {task && task.length > PAGE_SIZE && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={Math.ceil(task.length / PAGE_SIZE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          activeClassName={'active'}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};
ListTodo.propTypes = {
  tasks: PropTypes.array
};

export default ListTodo;