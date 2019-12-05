import React from "react";
import Nav from "./components/Nav";
import DataDisplay from "./components/DataDisplay";
import "./styles/App.css";
import fastapi from './api/fastapi'
import moment from "moment";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userDate: moment(Date()).format("YYYY-MM-DD"),
      apiData: {}, 
      navState: "movement",
    };
    this.setNavState = this.setNavState.bind(this);
  }

  setNavState(nav) {
    const btnArr = ["overview", "movement", "distribution"];
    this.setState({ navState: btnArr[nav] });

    this.onDateChange(this.state.userDate)
  }

  onDateChange = async date => {
    const response = await fastapi.get(`/${date}`)
    this.setState({ 
      apiData: response.data, 
      userDate: date ? date : this.state.userDate
    })
  }

  render() {
    return (
      <div className="App">
        <Nav getNav={this.setNavState} getDate={this.onDateChange} />
        <DataDisplay NavState={this.state.navState} apiData={this.state.apiData} userDate={this.state.userDate}/>
      </div>
    );
  }
}

export default App;