import React, { Component } from "react";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Checkbox,
  Form,
  Icon,
  Label,
  Table,
  Item
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  listRentalLocationsGet,
  removeRentalLocationDelete
} from "../services/RentalCarsServer";

class RentalLocations extends Component {
  state = {
    locationList: [],
    updateMode: null,
    deleteMode: null,
    headerTitle: ""
  };

  jumpRef = React.createRef();

  handlerItemClick = location => {
    const { updateMode, deleteMode } = this.state;

    if (updateMode) {
      console.log("Item clicked to update");
      console.log(location);

      this.props.history.push(`/locationform/${location.id}`);
    }

    if (deleteMode) {
      console.log("Item clicked to delete");
      console.log(location);

      this.removeRentalLocation(location);
    }
  };

  listRentalLocations = () => {
    console.log("Listing Rental Locations...");

    listRentalLocationsGet()
      .then(response => {
        console.log("GET success!");
        console.log(response);

        this.setState({ locationList: response.data }, () => {
          // this.jumpRef.current.scrollIntoView({
          //   block: "start",
          //   behavior: "instant"
          // });

          this.props.history.push("/locations");
        });
      })
      .catch(error => {
        console.log("GET failed!");
        console.log(error);
      });
  };

  removeRentalLocation = location => {
    console.log("Removing Rental Location: ", location);

    removeRentalLocationDelete(location.id)
      .then(response => {
        console.log("DELETE success!");
        console.log(response);

        this.listRentalLocations();
      })
      .catch(error => {
        console.log("DELETE failed!");
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("RentalLocations component mounted");

    this.listRentalLocations();

    console.log("RentalLocations mounted props: ", this.props);

    // if (this.props.location.pathname === "/locations/update") {
    //   this.setState({ updateMode: true });
    // } else {
    //   this.setState({ updateMode: false });
    // }

    if (this.props.updateMode === true) {
      this.setState({
        updateMode: true,
        headerTitle: "Rental Locations Update!"
      });
    } else {
      this.setState({
        updateMode: false,
        deleteMode: false,
        headerTitle: "Rental Locations!"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      console.log("RentalLocations updated props: ", this.props);

      //   if (this.props.location.pathname === "/locations/update") {
      //     this.setState({ updateMode: true });
      //   } else {
      //     this.setState({ updateMode: false });
      //   }

      if (this.props.updateMode === true) {
        this.setState({
          updateMode: true,
          deleteMode: false,
          headerTitle: "Rental Locations Update!"
        });
      } else if (this.props.deleteMode === true) {
        this.setState({
          deleteMode: true,
          updateMode: false,
          headerTitle: "Rental Locations Remove!"
        });
      } else {
        this.setState({
          updateMode: false,
          deleteMode: false,
          headerTitle: "Rental Locations!"
        });
      }
    }
  }

  render() {
    const { locationList, headerTitle, updateMode, deleteMode } = this.state;

    console.log("render locationList: ", locationList);

    return (
      <div>
        <Container fluid style={{ marginTop: "7em" }} textAlign="left">
          <div ref={this.jumpRef} />
          <Header as="h1" content={headerTitle} textAlign="center" />
          {updateMode && (
            <Header
              as="h2"
              content="Click on a location to update"
              textAlign="center"
            />
          )}
          {deleteMode && (
            <Header
              as="h2"
              content="Click on a location to remove"
              textAlign="center"
            />
          )}

          <Item.Group>
            <Grid container stackable columns={3}>
              {locationList.map(location => (
                <Grid.Column stretched={true} key={location.id}>
                  <div
                    locationid={location.id}
                    onClick={() => this.handlerItemClick(location)}
                  >
                    {/* <Segment> */}
                    <Item>
                      <Item.Content>
                        <Item.Header as="a">
                          {location.locationName}
                        </Item.Header>
                        <Item.Description>
                          <div>{location.phone}</div>
                          <div>{location.street}</div>
                          <div>
                            {location.city}
                            {location.state !== "" ? ", " : ""}
                            {location.state} {location.zip}
                          </div>
                          <div>{location.country}</div>
                        </Item.Description>
                      </Item.Content>
                    </Item>
                    {/* </Segment> */}
                  </div>
                </Grid.Column>
              ))}
            </Grid>
          </Item.Group>
        </Container>
      </div>
    );
  }
}

export default RentalLocations;
