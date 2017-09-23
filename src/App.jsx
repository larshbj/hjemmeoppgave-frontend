import React from "react";
import { requestData } from "./requests/requestApi";
import Table from "./Table";

const App = React.createClass({
  url:
    "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100",

  // componentDidMount: function() {
  //   requestData(this.url, this.gotData);
  // },
  //
  // gotData: function(data) {
  //   console.log(data.items);
  //   console.log("success");
  // },

  render: function() {
    return (
      <div className="container">
        <div className="row headerContent">
          <div className="headerTitle">Hjemmeoppgave-frontend</div>
        </div>
        <Table url={this.url} />;
      </div>
    );
  }
});

export default App;
