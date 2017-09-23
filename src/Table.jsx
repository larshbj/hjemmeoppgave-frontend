import React from "react";
import { requestData } from "./requests/requestApi";

function TableRow(props) {
  return (
    <tr>
      <td scope="row">{props.index}</td>
      <th>{props.name}</th>
      <td>{props.description}</td>
      <td>{props.updated.slice(0, 10)}</td>
      <td>
        <a href={props.url}>{props.url}</a>
      </td>
    </tr>
  );
}

var Table = React.createClass({
  propTypes: {
    repos: React.PropTypes.array
  },

  render: function() {
    var repoIndex = 1;
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Updated</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {this.props.repos.map(function(repo) {
              var id = repo.id;
              return (
                <TableRow
                  {...this.props}
                  key={id}
                  index={repoIndex++}
                  name={repo.full_name}
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
});

var TableDataFetcher = React.createClass({
  getInitialState: function() {
    return { repos: [] };
  },

  componentDidMount: function() {
    requestData(this.props.url, this.gotData);
  },

  gotData: function(data) {
    console.log("changing state");
    this.setState({ repos: data.items }, function() {
      console.log("new state", this.state.repos);
    });
    // this.repos = data.items;
  },

  render: function() {
    if (!this.state.repos.length) {
      console.log("repos is empty");
      return null;
    }
    return <Table {...this.props} repos={this.state.repos} />;
  }
});

export default TableDataFetcher;
