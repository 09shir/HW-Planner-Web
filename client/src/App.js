import React, { useState, Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom/client';
import axios from "axios";

//import logo from './logo.svg';
//import './App.css';
/*
async function callbackendapi() {
  const dep = await fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring');
  const depBody = await dep.json();
  console.log(depBody[2].text);

  var ret = {
    departments: [],
    depCount: []
  }

  for (let i = 0; i < depBody.length; i++){
    ret.departments.push(depBody[i].text);
    ret.depCount.push(ret.depCount.length);
  }

  return ret;
}

  // HWName, department, course, dueDate, priority, comments
async function Form() {

  const [assignment, setAssignment] = useState({
    HWName: "",
    department: "",
    course: "",
    dueDate: "",
    priority: "",
    comments: "",
  })

  const [departments, setDepartments] = useState([]);

  const dep = await fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring');
  const depBody = await dep.json();
  console.log(depBody.length);

  for (let i = 0; i < depBody.length; i++){
    var course = depBody[i].text;
    setDepartments([...departments, {dep: course}]);
  }

  console.log(departments);
  

  return (
    <div className="Form">
      <form>
      <div className ="row g-3 align-items-center">
          <div className ="col-auto">
              <label className="col-form-label">Assignment Name: </label>
          </div>
          <div className="col-auto">
              <input 
                type="text" 
                id="HWName" 
                name="HWName" 
                className="form-control" 
              />
          </div>
          <div className ="col-auto">
              <label className="col-form-label">Select Department: </label>
          </div>
          <div className ="col-auto">
            <select 
              className="form-select" 
              id="department" 
              name="department" 
              aria-label="Default select example" >
              {
                departments.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))
              }
            </select>
          </div>
          <div className="col-auto">
              <label className="col-form-label">Course ID: </label>
          </div>
          <div className="col-auto">
              <input 
                type="text" 
                id="course" 
                name="course" 
                className="form-control"  />
          </div>

          <div className="col-auto">
              <label className="col-form-label">Due Date: </label>
          </div>
          <div className="col-auto">
              <input 
                type="text" 
                id="dueDate" 
                name="dueDate" 
                className="form-control"  />
          </div>

          <div className="col-auto">
              <label className="col-form-label">Priority: </label>
          </div>
          <div className="col-auto">
              <input 
                type="text" 
                id="priority" 
                name="priority" 
                className="form-control"  />
          </div>

          <div className="col-auto">
              <label className="col-form-label">Comments: </label>
          </div>
          <div className="col-auto">
              <input 
                type="text" 
                id="comments" 
                name="comments" 
                className="form-control" />
          </div>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
        <br></br>
    </div>
  )

}*/

class Troll extends Component {

  state = {
    departments: [],
    depCount: []
  }

  /*[inputs, setInputs] = useState({});
  
  
  // HWName, courseID, course, dueDate, priority, comments
  triggerAPI = useCallback(async () => {
    // Use async await instead of chained promise
    const res = await axios.post("http://localhost:5000/add", {
       HWName: inputs.HWName,
       courseID: inputs.courseID,
       course: inputs.course,
       dueDate: inputs.dueDate,
       priority: inputs.priority,
       comments: inputs.comments
      });
    console.log(res)
  }, [inputs]);

  handleSubmit = useCallback((e) => {
    e.preventDefault()
    triggerAPI();
  }, [triggerAPI])

  handleChange = useCallback((event) => {
    setInputs(event.target.value);
  }, []);*/

  componentDidMount() {
    this.callbackendapi().then(res => this.setState({
      departments: res.departments,
      depCount: res.depCount
    }))
    .catch(err => console.log(err));
  }

  callbackendapi = async () => {

    const dep = await fetch('http://www.sfu.ca/bin/wcm/course-outlines?2023/spring');
    const depBody = await dep.json();
    console.log(depBody[2].text);

    var ret = {
      departments: [],
      depCount: []
    }

    for (let i = 0; i < depBody.length; i++){
      ret.departments.push(depBody[i].text);
      ret.depCount.push(ret.depCount.length);
    }

    return ret;
  }

  render(){
    return (
      <div className="Troll">
        <div className ="row g-3 align-items-center center-horizontal">
            <div className ="col-auto">
                <label className="col-form-label">Workload of a typical</label>
            </div>
            <div className ="col-auto">
              <select 
                className="form-select" 
                id="department" 
                name="department" 
                aria-label="Default select example" >
                  <option> Your Major</option>
                {
                  this.state.depCount.map((index) => (
                    <option key={index} value={this.state.departments[index]}>{this.state.departments[index]}</option>
                  ))
                }
              </select>
            </div>
            <div className ="col-auto">
                <label className="col-form-label"> student </label>
            </div>
          </div>
          <br></br>
      </div>
    )
  }

}




class App extends Component {

  state = {
    id: [], 
    name: [], 
    course: [], 
    dueDate: [],
    priority: [],
    comments: [],
    len: [],
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ 
        id: res.id, 
        name: res.name, 
        course: res.course, 
        dueDate: res.dueDate, 
        priority: res.priority,
        comments: res.comments,
        len: res.len,
      }))
      .catch(err => console.log(err));
  }
    // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/getassignmentsbyduedate');
    const body = await response.json();
    console.log(body.assignments.length);

    if (response.status !== 200) {
      throw Error(body.message) 
    }

    var ret = {
           id: [],
           name: [],
           course: [],
           dueDate: [],
           priority: [],
           comments: [],
           len: [],
    }

    for (let i = 0; i < body.assignments.length; i++){
      ret.id.push(body.assignments[i].id);
      ret.name.push(body.assignments[i].name);
      ret.course.push(body.assignments[i].course);
      ret.dueDate.push(body.assignments[i].dueDate);
      ret.priority.push(body.assignments[i].priority);
      ret.comments.push(body.assignments[i].comments);
      ret.len.push(ret.len.length);
    }

    return ret;
    
  };

  goEdit(){
    window.location.href='edit.html';
  }

  render(){
    return (
      <div className="App">
        <Troll />

      <table className="table table-bordered text-black">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Assignment Name</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th>Delete</th>
            </tr>
          </thead>
      <tbody>
      {
        this.state.len.map((i) => (
          <tr key={i}>
                  <td>{this.state.id[i]}</td>
                  <td>{this.state.course[i]}</td>
                  <td>{this.state.name[i]}</td>
                  <td>{this.state.dueDate[i]}</td>
                  <td>{this.state.priority[i]}</td>
                  <td>{this.state.comments[i]}</td>
                  <td><button onClick={() => window.location.href='delete.html'} className="btn btn-success"> Delete </button> </td>
          </tr>
        ))
      }

    </tbody>
    </table>
    </div>
    )
  }
}


export default App;
