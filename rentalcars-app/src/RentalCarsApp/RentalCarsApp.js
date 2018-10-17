import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { withRouter } from "react-router";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import RentalCarsInventory from "./RentalCarsInventory";
import RentalCarsMenuPage from "./RentalCarsMenuPage";
import RentalCarsForm from "./RentalCarsForm";
import RentalLocationForm from "./RentalLocationForm";
import RentalLocations from "./RentalLocations";
import RentalCarTypes from "./RentalCarTypes";
import RentalCarTypesForm from "./RentalCarTypesForm";

class RentalCarsApp extends Component {
  state = {
    showRentalCarsInv: null
  };

  handlerMenuBar = (event, data) => {
    // console.log("handlerMenuBar data props: ", data);

    // console.log("props: ", this.props);

    switch (data.name) {
      case "Home":
        this.props.history.push("/");
        break;
    }
  };

  handlerDropdown = (event, data) => {
    const { showRentalCarsInv } = this.state;

    switch (data.text) {
      case "Inventory":
        this.setState(
          {
            showRentalCarsInv: !showRentalCarsInv
          },
          () => {
            console.log("showRentalCarsInv state: ", showRentalCarsInv);

            this.props.history.push("/cars");
          }
        );
        break;
    }
  };

  handlerDropdownItem = (event, data) => {
    event.stopPropagation();

    // console.log("DropdownItem data props: ", data);

    switch (data.name) {
      case "AddCar":
        this.props.history.push("/carform");
        break;
      case "ListCars":
        this.props.history.push("/cars");
        break;
      case "UpdateCar":
        this.props.history.push("/cars/update");
        break;
      case "RemoveCar":
        this.props.history.push("/cars/remove");
        break;
      case "AddCarType":
        this.props.history.push("/cartypeform");
        break;
      case "ListCarTypes":
        this.props.history.push("/cartypes");
        break;
      case "CarTypes":
        this.props.history.push("/cartypes");
        break;
      case "AddLocation":
        this.props.history.push("/locationform");
        break;
      case "ListLocations":
        this.props.history.push("/locations");
        break;
      case "UpdateLocation":
        this.props.history.push("/locations/update");
        break;
      case "RemoveLocation":
        this.props.history.push("/locations/remove");
      default:
        break;
    }
  };

  componentDidMount() {
    this.setState({ showRentalCarsInv: false });
  }

  render() {
    const { showRentalCarsInv } = this.state;

    return (
      <div>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item as="a" header>
              Rental Cars
            </Menu.Item>
            <Menu.Item as="a" onClick={this.handlerMenuBar} name="Home">
              <Link to="/">Home</Link>
            </Menu.Item>

            <Dropdown
              item
              simple
              text="Inventory"
              // onClick={this.handlerDropdown}
            >
              <Dropdown.Menu>
                <Dropdown.Header>Rental Cars</Dropdown.Header>
                <Dropdown.Item onClick={this.handlerDropdownItem} name="AddCar">
                  Add (Create)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="ListCars"
                >
                  List All (Read/Get All)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="UpdateCar"
                >
                  Update
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="RemoveCar"
                >
                  Remove (Delete)
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="CarTypes"
                >
                  Car Types
                </Dropdown.Item>
                {/* <Dropdown.Header>Car Types</Dropdown.Header> */}
                {/* <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Inventory</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>Create Car</Dropdown.Item>
                    <Dropdown.Item>Get All Cars</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item> */}
                {/* <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="AddCarType"
                >
                  Add (Create)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="ListCarTypes"
                >
                  List All (Read/Get All)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="UpdateCarType"
                >
                  Update
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="RemoveCarType"
                >
                  Remove (Delete)
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              item
              simple
              text="Locations"
              onClick={this.handlerDropdown}
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="AddLocation"
                >
                  Add (Create)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="ListLocations"
                >
                  List All (Read/Get All)
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="UpdateLocation"
                >
                  Update
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={this.handlerDropdownItem}
                  name="RemoveLocation"
                >
                  Remove (Delete)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Container style={{ marginTop: "7em" }}>
          <Header
            as="h1"
            content="Rental Cars (using Semantic UI)"
            textAlign="center"
          />

          <Switch>
            <Route exact path="/cars" component={RentalCarsInventory} />
            {/* <Route path="/main" component={RentalCarsMenuPage} /> */}
            <Route exact path="/carform" component={RentalCarsForm} />
            <Route path="/carform/:carId(\d+)" component={RentalCarsForm} />
            <Route
              path="/cars/update"
              render={props => (
                <RentalCarsInventory {...props} updateMode={true} />
              )}
            />
            <Route
              path="/cars/remove"
              render={props => (
                <RentalCarsInventory {...props} deleteMode={true} />
              )}
            />
            <Route exact path="/cartypes" component={RentalCarTypes} />
            <Route exact path="/cartypeform" component={RentalCarTypesForm} />
            <Route
              path="/cartypesform/:carTypeId(\d+)"
              component={RentalCarTypesForm}
            />
            <Route exact path="/locationform" component={RentalLocationForm} />
            <Route
              path="/locationform/:locationId(\d+)"
              component={RentalLocationForm}
            />
            <Route exact path="/locations" component={RentalLocations} />
            <Route
              path="/locations/update"
              render={props => <RentalLocations {...props} updateMode={true} />}
            />
            <Route
              path="/locations/remove"
              render={props => <RentalLocations {...props} deleteMode={true} />}
            />
          </Switch>
        </Container>

        <Segment
          inverted
          vertical
          style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
        >
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 1" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 2" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Group 3" />
                  <List link inverted>
                    <List.Item as="a">Link One</List.Item>
                    <List.Item as="a">Link Two</List.Item>
                    <List.Item as="a">Link Three</List.Item>
                    <List.Item as="a">Link Four</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Footer Header" />
                  <p>
                    Extra space for a call to action inside the footer that
                    could help re-engage users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Divider inverted section />
            {/* <Image centered size="mini" src="/logo.png" /> */}
            <List horizontal inverted divided link>
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </div>
    );
  }
}

export default withRouter(RentalCarsApp);
