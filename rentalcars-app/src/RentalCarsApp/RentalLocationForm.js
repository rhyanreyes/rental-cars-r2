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
  Form
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  createRentalLocationPost,
  listRentalLocationGet,
  updateRentalLocationPut
} from "../services/RentalCarsServer";

class RentalLocationForm extends Component {
  state = {
    locationName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    lat: 0,
    long: 0,
    id: 0,
    locationData: {},
    updateMode: null
  };

  jumpRef = React.createRef();

  handlerSubmitForm = () => {
    const { id, updateMode } = this.state;

    if (updateMode) {
      const updateLocation = this.readForm();

      updateLocation.id = id;

      this.updateRentalLocation(updateLocation);
    } else {
      const newLocation = this.readForm();

      this.addRentalLocation(newLocation);
    }
  };

  addRentalLocation = location => {
    console.log("Adding location: ", location);

    createRentalLocationPost(location)
      .then(response => {
        console.log("POST success!");
        console.log(response);

        this.clearForm();

        this.jumpRef.current.scrollIntoView({
          block: "start",
          behavior: "instant"
        });

        this.props.history.push("/locations");
      })
      .catch(error => {
        console.log("POST failed!");
        console.log(error);
      });
  };

  getRentalLocation = locationId => {
    listRentalLocationGet(locationId)
      .then(response => {
        console.log("GET by ID success!");
        console.log(response);

        this.loadForm(response.data);
        this.setState({ locationData: response.data });
      })
      .catch(error => {
        console.log("GET by ID failed!");
        console.log(error);
      });
  };

  updateRentalLocation = location => {
    console.log("Updating location: ", location);

    updateRentalLocationPut(location.id, location)
      .then(response => {
        console.log("PUT success!");
        console.log(response);

        this.clearForm();
        this.setState({ updateMode: false });

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("PUT failed!");
        console.log(error);
      });
  };

  readForm = () => ({
    locationName: this.state.locationName,
    street: this.state.street,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip,
    country: this.state.country,
    phone: this.state.phone,
    lat: this.state.lat,
    long: this.state.long
  });

  clearForm = () => {
    this.setState({
      locationName: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      phone: "",
      lat: 0,
      long: 0
    });
  };

  loadForm = location => {
    this.setState({
      locationName: location.locationName,
      street: location.street,
      city: location.city,
      state: location.state,
      zip: location.zip,
      country: location.country,
      phone: location.phone,
      lat: location.lat,
      long: location.long,
      id: location.id
    });
  };

  componentDidMount() {
    console.log("RentalLocationForm component mounted");

    // Setting sample data
    // this.setState({
    //   locationName: "Beverly Hills",
    //   street: "9732 S. Santa Monica Blvd.",
    //   city: "Beverly Hills",
    //   state: "CA",
    //   zip: "90210",
    //   country: "",
    //   phone: "(310) 274-6969"
    // });

    this.jumpRef.current.scrollIntoView({
      block: "start",
      behavior: "instant"
    });

    console.log("RentalLocationForm mounted props: ", this.props);

    // this.props.match.params.locationId
    const locationId = this.props.match.params.locationId;

    if (locationId) {
      console.log("RentalLocationForm locationId: ", locationId);

      this.getRentalLocation(locationId);

      this.setState({ updateMode: true });
    } else {
      this.setState({ updateMode: false });
    }
  }

  render() {
    return (
      <div>
        <Container fluid text style={{ marginTop: "7em" }} textAlign="left">
          <div ref={this.jumpRef} />
          <Header as="h1" content="Rental Location Form!" textAlign="center" />
          <Form>
            {/* <Form.Field>
              <label>First Name</label>
              <input placeholder="First Name" />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input placeholder="Last Name" />
            </Form.Field>
            <Form.Field>
              <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field> */}
            <Form.Field>
              <label>Location Name</label>
              <input
                placeholder="Location Name"
                value={this.state.locationName}
                onChange={e => {
                  this.setState({ locationName: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Street</label>
              <input
                placeholder="Street"
                value={this.state.street}
                onChange={e => {
                  this.setState({ street: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>City</label>
              <input
                placeholder="City"
                value={this.state.city}
                onChange={e => {
                  this.setState({ city: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>State</label>
                <input
                  placeholder="State"
                  value={this.state.state}
                  onChange={e => {
                    this.setState({ state: e.target.value });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Zip</label>
                <input
                  placeholder="Zip"
                  value={this.state.zip}
                  onChange={e => {
                    this.setState({ zip: e.target.value });
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>Country</label>
                <input
                  placeholder="Country"
                  value={this.state.country}
                  onChange={e => {
                    this.setState({ country: e.target.value });
                  }}
                />
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>Phone</label>
              <input
                placeholder="Phone"
                value={this.state.phone}
                onChange={e => {
                  this.setState({ phone: e.target.value });
                }}
              />
            </Form.Field>

            <Button type="submit" onClick={this.handlerSubmitForm}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default RentalLocationForm;
