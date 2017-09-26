import React from "react";
import { requestData } from "./requests/requestApi";
import NavLink from "./NavLink.jsx";

function TableRow(props) {
  return (
    <tr>
      <td scope="row">{props.tableIndex}</td>
      <td>{props.id}</td>
      <th>{props.name}</th>
      <td>{props.owner}</td>
      <td>{props.description}</td>
      <td>{props.updated.slice(0, 10)}</td>
      <td>
        <a href={props.url}>{props.url}</a>
      </td>
    </tr>
  );
}

function Table(props) {
  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Description</th>
            <th>Updated</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {props.repos.map(function(repo) {
            return (
              <TableRow
                key={repo.id}
                tableIndex={repo.tableIndex}
                id={repo.id}
                name={repo.name}
                owner={repo.owner.login}
                description={repo.description}
                updated={repo.updated_at}
                url={repo.html_url}
              />
            );
          }, this)}
        </tbody>
      </table>
    </div>
  );
}

var TableOrganizer = React.createClass({
  propTypes: {
    repos: React.PropTypes.array,
    rowsPerPage: React.PropTypes.number.isRequired
  },

  // returns a new list containing the repos splitted into sublists
  getSubRepos: function(repos) {
    var new_repos = [...repos];
    var number = this.props.rowsPerPage;
    var listWithRepos = [];
    while (new_repos.length) {
      if (number >= repos.length) {
        listWithRepos.push(new_repos.splice(0));
      } else {
        listWithRepos.push(new_repos.splice(0, number));
      }
    }
    return listWithRepos;
  },

  render: function() {
    var buttonIndex = 0;
    if (this.props.rowsPerPage == undefined) {
      return null;
    }
    var listWithRepos = this.getSubRepos(this.props.repos);
    var selectedTableId = this.props.params.tableId;
    if (!selectedTableId) {
      selectedTableId = 1;
    } else {
      selectedTableId = parseInt(selectedTableId, 10);
    }
    return (
      <div className="table-page">
        {listWithRepos.map(function(list) {
          buttonIndex++;
          return (
            <NavLink key={buttonIndex} to={"/" + buttonIndex}>
              {buttonIndex}
            </NavLink>
          );
        }, this)}
        <Table {...this.props} repos={listWithRepos[selectedTableId - 1]} />
      </div>
    );
  }
});

var TableDataFetcher = React.createClass({
  getInitialState: function() {
    return { repos: [] };
  },
  url:
    "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100",

  componentDidMount: function() {
    requestData(this.url, this.gotData);
  },

  // when data is fetched: sorts list by decreasing id and adds tableIndex for table
  gotData: function(data) {
    var items = data.items;
    items.sort((a, b) => b.id - a.id);
    var new_index = items.map((repo, index) => {
      repo.tableIndex = index + 1;
      return repo;
    });
    this.setState({ repos: new_index }, function() {});
  },

  render: function() {
    if (!this.state.repos.length) {
      console.log("repos is empty");
      return null;
    }
    return (
      <div>
        <TableOrganizer
          {...this.props}
          repos={this.state.repos}
          rowsPerPage={20}
        />
      </div>
    );
  }
});

export default TableDataFetcher;
