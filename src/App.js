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
      else 
          this.setState({ repositories: res.data});
    })
    .catch(ex => {
        toastr["error"]("Error: " + ex.message);
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Repositories repositories={this.state.repositories}/>
        <footer className="font-small text-center mt-4 mb-3">
          Desenvolvido por 
          <a href="https://guibranco.github.io/?utm_campaign=project&utm_media=vagas+aggregator&utm_source=apibr.com">
            &nbsp; 
            <img src="https://guibranco.github.io/photo.png" alt="Guilherme Branco Stracini" className="image-rounded image-responsive" style={{ width: "24px" }} />
            &nbsp;
            Guilherme Branco Stracini
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
