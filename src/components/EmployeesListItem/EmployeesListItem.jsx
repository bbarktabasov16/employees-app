import "./EmployeesListItem.css";

const EmployeesListItem = (props) => {
  const { id, name, salary, onDelete, onToggleProp, increase, rise, onSalaryChange } = props;

  let classNames = "list-group-item d-flex justify-content-between";

  if (increase) {
    classNames += " increase";
  }

  if (rise) {
    classNames += " like";
  }

	const onChangeInputValue = (event) => {
    const newSalary = event.target.value.replace('$', '');
    onSalaryChange(id, newSalary);
  };

  return (
    <li className={classNames}>
      <span className="list-group-item-label" onClick={onToggleProp} data-toggle="rise" >
        {name}
      </span>
      <input
        type="text"
        className="list-group-item-input"
        value={salary + "$"}
				onChange={onChangeInputValue}
      />
      <div className="d-flex justify-content-center align-items-center">
        <button
          type="button"
          className="btn-cookie btn-sm"
          onClick={onToggleProp}
					data-toggle="increase"
        >
          <i className="fas fa-cookie"></i>
        </button>

        <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>
    </li>
  );
};

export default EmployeesListItem;
