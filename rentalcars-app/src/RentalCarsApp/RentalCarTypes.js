import React, { Component } from "react";
import { Container, Form, Icon, Label, Menu, Table } from "semantic-ui-react";

import RentalCarTypesTable from "./RentalCarTypesTable";
import {
  listRentalCarTypesGet,
  addRentalCarTypePost
} from "../services/RentalCarsServer";

class RentalCarTypes extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Rental Car Types!</h1>
        <RentalCarTypesTable />
      </div>
    );
  }
}

export default RentalCarTypes;
