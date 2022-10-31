import React, { Component } from "react";
import axios from "axios";
import toastr from "toastr";
import { Repositories } from "./Components";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { repositories: []};
    this.apiUrl = "https://apibr.com/vagas/api/v1/";
}

  componentDidMount() {
    this.getRepositories();
  }

  getRepositories(){
    axios
    .get(this.apiUrl + "repositories")
    .then(res => {
      if (res.data.length === 0)
          toastr["error"]("Unable to get repositories, check the API", null, { closeButton: true });
      else {
          var arr = [];
          for (var item in res.data)
              if (res.data.hasOwnProperty(item))
                  arr.push(res.data[item].value);
          this.setState({ repositories: arr});
      }
  })
  .catch(ex => {
      toastr["error"]("Error: " + ex.message);
      this.setState({ repositories: [{organization: { login: "teste"}},{organization: { login: "teste"}},{organization: { login: "teste"}}]});
  });;
  }

  render() {
    return (
      <div className="container-fluid">
        <Repositories repositories={this.state.repositories}/>
      </div>
    );
  }
}

export default App;
