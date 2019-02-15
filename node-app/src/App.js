import React from "react";
import axios from "axios";
import './App.css';


class App extends React.Component {
  state = {
    projects: [],
    actions: [],
    error: '',
  }

  componentDidMount() {
    axios
      .get("localhost:9000/api/projects/")
      .then(res => {
        console.log(res);
        this.setState({
          projects: res.data,
          error: ''
        })
      })
      .catch(err => {
        this.setState({ error: "error"})
      })
  }

  render() {
    return (

      <div>
        <h2>Projects</h2>
        {this.state.projects.map(project => (
          <p>{project.name}</p>
        ))}
      </div>
    )
  }
}

export default App;