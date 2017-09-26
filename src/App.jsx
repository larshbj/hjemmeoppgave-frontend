import React from "react";
import { requestData } from "./requests/requestApi";
import TableOrganizer from "./TableOrganizer";

const App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <div className="row headerContent">
          <div className="headerTitle">Populære Javascript-repositories</div>
        </div>

        <div className="row page">
          <TableOrganizer {...this.props} />
        </div>
      </div>
    );
  }
});

export default App;
