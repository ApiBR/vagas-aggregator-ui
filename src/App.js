import React, { Component } from "react";
import axios from "axios";
import toastr from "toastr";
import { Repositories, Issues } from "./Components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { repositories: [], issues: [], totalIssues: 0, totalPages: 0, currentPage: 1 };
    this.apiUrl = "https://apibr.com/vagas/api/v1/";
  }

  componentDidMount() {
    this.getRepositories();
    this.getIssues();
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

  getIssues(){
    axios
    .get(this.apiUrl + "issues?per_page=50&page=" + this.state.currentPage)
    .then(res => {
      if(res.data.length===0)
        toastr["error"]("Unable to get repositories, check the API", null, { closeButton: true });
      else 
          this.setState({ issues: res.data, totalIssues: res.headers["x-total-results"], totalPages: res.headers["x-total-pages"] });

    })
    .catch(ex => {
      toastr["error"]("Error: " + ex.message);
    });
  }

  loadPage(pageNumber) {
    console.log("Load page " + pageNumber);
  }

  render() {
    return (
      <div className="container-fluid">
        <Issues issues={this.state.issues} totalIssues={this.state.totalIssues} totalPages={this.state.totalPages} currentPage={this.state.page} loadPage={this.loadPage} />
        <Repositories repositories={this.state.repositories} />
        <footer className="font-small text-center mt-4 mb-3">
          Desenvolvido por 
          <a href="https://guibranco.github.io/?utm_campaign=project&utm_media=vagas+aggregator&utm_source=apibr.com" target="_blank" rel="noopener noreferrer">
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
