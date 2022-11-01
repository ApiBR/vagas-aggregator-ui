import React, { Component } from "react";
import axios from "axios";
import toastr from "toastr";
import { Repositories, Issues } from "./Components";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      labels: [],
      repositories: [], 
      issues: [], 
      pageSize: 100,
      totalIssues: 0, 
      totalPages: 0, 
      currentPage: 1,
      filteredLabels: null,
      filteredOrganizations: null
    };
    this.apiUrl = "https://apibr.com/vagas/api/v1/";
  }

  componentDidMount() {
    this.getLabels(1);
    this.getRepositories();
    const params = new URLSearchParams(window.location.search);
    let currentPage = parseInt(params.get("currentPage"));
    if(isNaN(currentPage) || currentPage < 1)
    {
      currentPage = 1;
    }
    this.setState( { 
      currentPage, 
      filteredLabels: params.get("labels"),
      filteredOrganizations: params.get("organizations")
    }, () => { 
      this.getIssues();
    });
  }

  getLabels(page){
    axios
    .get(this.apiUrl + "labels?per_page=100&page=" + page)
    .then(res => {
      if (res.data.length === 0)
          toastr["error"]("Não foi possível obter as labels", null, { closeButton: true });
      else {
          this.state.labels.push(res.data);
          this.setState({ labels: this.state.labels });
          if(res.headers["x-total-pages"] > page){
            this.getLabels(++page);
          }
      }
    })
    .catch(ex => {
        toastr["error"]("Error: " + ex.message);
    });
  }

  getRepositories(){
    axios
    .get(this.apiUrl + "repositories")
    .then(res => {
      if (res.data.length === 0)
          toastr["error"]("Não foi possível obter os repositórios", null, { closeButton: true });
      else 
          this.setState({ repositories: res.data});
    })
    .catch(ex => {
        toastr["error"]("Error: " + ex.message);
    });
  }

  getIssues(){
    let url = this.apiUrl + "issues?per_page=" + this.state.pageSize + "&page=" + this.state.currentPage;
    if(this.state.filteredLabels !== null){
      url += "&labels=" + this.state.filteredLabels;
    }
    if(this.state.filteredOrganizations !== null){
      url += "&organizations=" + this.state.filteredOrganizations;
    }

    axios
    .get(url)
    .then(res => {
      if(res.data.length===0)
        toastr["error"]("Não foi possível obter as vagas da página " + this.state.currentPage, null, { closeButton: true });
      else 
          this.setState({ issues: res.data, totalIssues: res.headers["x-total-results"], totalPages: res.headers["x-total-pages"] });

    })
    .catch(ex => {
      toastr["error"]("Error: " + ex.message);
    });
  }

  loadPage(pageNumber) {
    this.setState( { currentPage: pageNumber }, () => { this.getIssues(); });
  }

  render() {
    return (
      <div className="container-fluid">
        <Issues issues={this.state.issues} totalIssues={this.state.totalIssues} totalPages={this.state.totalPages} currentPage={this.state.currentPage} loadPage={this.loadPage.bind(this)} />
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
