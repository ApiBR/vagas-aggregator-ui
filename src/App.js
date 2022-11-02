import React, { Component } from "react";
import axios from "axios";
import toastr from "toastr";
import { NavBar} from "./Components/NavBar";
import { Repositories } from "./Components/Repositories";
import { Issues } from "./Components/Issues";
import { Footer } from "./Components/Footer";

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
      orderField: "updated_at",
      orderDirection: "desc",
      filteredLabels: null,
      filteredOrganizations: null,
      filteredTerm: null
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
      filteredOrganizations: params.get("organizations"),
      filteredTerm: params.get("term")
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
          const labels = this.state.labels.concat(res.data);
          this.setState({ labels: labels }, () => {
            if(res.headers["x-total-pages"] > page){
              this.getLabels(++page);
            }
          });
      }
    })
    .catch(ex => {
        toastr["error"]("Error: " + ex.message);
    });
  }

  getRepositories(){
    axios
    .get(this.apiUrl + "repositories?per_page=100&page=1")
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
    let url = this.apiUrl + "issues" +
      "?per_page=" + this.state.pageSize + 
      "&page=" + this.state.currentPage + 
      "&orderField=" + this.state.orderField +
      "&orderDirection=" + this.state.orderDirection;

    if(this.state.filteredLabels !== null){
      url += "&labels=" + this.state.filteredLabels;
    }
    if(this.state.filteredOrganizations !== null){
      url += "&organizations=" + this.state.filteredOrganizations;
    }
    if(this.state.filteredTerm !== null){
      url += "&term=" + this.state.filteredTerm;
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

  doSearch(input){
    this.setState( { filteredTerm: input.value, currentPage: 1 }, () => { this.getIssues(); });
  }

  changeQuantity(input){
    this.setState( { pageSize: input.value, currentPage: 1 }, () => { this.getIssues(); });
  }

  render() {
    return (
      <div className="container-fluid">
        <NavBar labels={this.state.labels} doSearch={this.doSearch.bind(this)} changeQuantity={this.changeQuantity.bind(this)} currentQuantity={this.state.pageSize} />
        <Issues issues={this.state.issues} totalIssues={this.state.totalIssues} totalPages={this.state.totalPages} currentPage={this.state.currentPage} loadPage={this.loadPage.bind(this)} />
        <Repositories repositories={this.state.repositories} />
        <Footer />
      </div>
    );
  }
}

export default App;
