import React, { Component } from "react";

import AppInfo from "../AppInfo/AppInfo";
import SearchPanel from "../SearchPanel/SearchPanel";
import AppFilter from "../AppFilter/AppFilter";
import EmployeesList from "../EmployeesList/EmployeesList";
import EmployeesAddForm from "../EmployeesAddForm/EmployeesAddForm";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          name: "Argen D.",
          salary: 1500,
          increase: true,
          rise: false,
          id: 1,
        },
        {
          name: "Nuremir K.",
          salary: 1000,
          increase: false,
          rise: false,
          id: 2,
        },
        {
          name: "Bekzat B.",
          salary: 850,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
			term: '',
			filter: 'all',
    };
    this.maxId = 4;
  }

	componentDidMount() {
    // Загружаем данные из localStorage при монтировании компонента
    const savedData = localStorage.getItem('employeeData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.setState({ data: parsedData });
      // Устанавливаем maxId на основе загруженных данных
      this.maxId = parsedData.length > 0 ? Math.max(...parsedData.map(item => item.id)) + 1 : this.maxId;
    }
  }

  componentDidUpdate(_, prevState) {
    // Сохраняем данные в localStorage при изменении состояния data
    if (prevState.data !== this.state.data) {
      localStorage.setItem('employeeData', JSON.stringify(this.state.data));
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter((item) => item.id !== id),
      };
    });
  };

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr,
      };
    });
  };

  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map((item) => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] };
        }
        return item;
      }),
    }));
  };

	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1
		})
	}

	onUpdateSearch = (term) => {
		this.setState({term})
	}

	filterPost = (items, filter) => {
		switch (filter) {
			case 'rise':
				return items.filter(item => item.rise)
			
			case 'moreThen1000':
				return items.filter(item => item.salary > 1000)

			default:
				return items
		}
	}

	onFilterSelect = (filter) => {
		this.setState({filter})
	}

	onSalaryChange = (id, newSalary) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, salary: newSalary };
				}
				return item;
			})
		}));
	}

  render() {
		const {data, term, filter} = this.state
    const employees = this.state.data.length;
    const increased = this.state.data.filter((item) => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter)

    return (
      <div className="App">
        <AppInfo employees={employees} increased={increased} />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
					onSalaryChange={this.onSalaryChange}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
