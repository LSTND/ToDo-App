import PropTypes from "prop-types";
import cx from "classnames";
import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemTodo from "../ItemTodo/ItemTodo";
import AddTask from "../AddTask/AddTask";
import ReactPaginate from "react-paginate";
import { tasks } from "../../redux/actions";
import { ItemViewModeContext } from "../../App";
import "./ListTodo.scss";
import "../AddTask/AddTask.scss";
import Button from "../Button/Button";

// Const for the number of tasks on one page
const LIST_PAGE_SIZE = 5; //amount items for list mode
const GRID_PAGE_SIZE = 6; //amount items for grid mode

const ListTodo = () => {
  const { viewMode, handleItemViewMode } = useContext(ItemViewModeContext);
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    // Request data from the server
    const getItem = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
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
  const pageSize = viewMode === "grid" ? GRID_PAGE_SIZE : LIST_PAGE_SIZE;
  const paginatedTodos = task.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return (
    <div>
      <div className="listTodo_btn">
        <AddTask />
        <div className="context_btn">
          <Button
            className="context_btn-gridView"
            onClick={() => handleItemViewMode("grid")}
          />
          <Button
            className="context_btn-listView"
            onClick={() => handleItemViewMode("list")}
          />
        </div>
      </div>
      <ul className={cx("itemTodo_container", { gridView: viewMode === "grid" } )}>
        {/* Displaying tasks using the ItemTodo component */}
        {paginatedTodos.map(
          (task) => task && <ItemTodo key={task.id} todo={task} />
        )}
      </ul>
      {/* Pagination */}
      {task && task.length > pageSize && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(task.length / pageSize)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};
ListTodo.propTypes = {
  tasks: PropTypes.array,
};

export default ListTodo;
