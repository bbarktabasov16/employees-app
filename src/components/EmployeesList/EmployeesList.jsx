import EmployeesListItem from "../EmployeesListItem/EmployeesListItem";
import "./EmployeesList.css";

const EmployeesList = ({ data, onDelete, onToggleProp, onSalaryChange }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        id={id}
        onDelete={() => onDelete(id)}
        onToggleProp={(e) =>
          onToggleProp(id, e.currentTarget.getAttribute("data-toggle"))
        }
        onSalaryChange={onSalaryChange}
      />
    );
  });

  return (
    <ul className="app-list list-group">
      {data.length === 0 ? (
        <h1 style={{ textAlign: "center", margin: "15px 0" }}>Not Found</h1>
      ) : (
        elements
      )}
    </ul>
  );
};

export default EmployeesList;
