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
  Select,
  Dimmer,
  Loader
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import {
  listRentalCarTypesGet,
  addRentalCarPost,
  loadRentalCarGet,
  updateRentalCarPut
} from "../services/RentalCarsServer";

class RentalCarsForm extends Component {
  state = {
    make: "",
    model: "",
    year: "",
    carType: 0,
    vin: "",
    color: "",
    id: 0,
    carTypesList: [],
    carTypeOptions: [],
    updateMode: null,
    rentalCar: {},
    activeLoader: null
  };

  handleClose = () => this.setState({ activeLoader: false });

  handlerSubmit = () => {
    const {
      make,
      model,
      year,
      carType,
      vin,
      color,
      id,
      updateMode
    } = this.state;

    if (updateMode) {
      const updateRentalCar = {
        Make: make,
        Model: model,
        Year: parseInt(year),
        CarType: carType,
        VIN: vin,
        Color: color,
        Id: id
      };

      this.updateRentalCar(updateRentalCar);
    } else {
      const newRentalCar = {
        Make: make,
        Model: model,
        Year: parseInt(year),
        CarType: carType,
        VIN: vin,
        Color: color
      };

      this.addRentalCar(newRentalCar);
    }
  };

  clearForm = () => {
    this.setState({
      make: "",
      model: "",
      year: "",
      carType: 0,
      vin: "",
      color: ""
    });
  };

  loadForm = rentalCar => {
    this.setState({
      make: rentalCar.make,
      model: rentalCar.model,
      year: rentalCar.year,
      carType: rentalCar.carType,
      vin: rentalCar.vin,
      color: rentalCar.color,
      id: rentalCar.id
    });
  };

  loadCarTypes = () => {
    this.setState({ activeLoader: true });

    listRentalCarTypesGet()
      .then(response => {
        console.log("Car Types GET success!");
        console.log(response);

        // this.setState({ carTypesList: response.data });

        const carTypes = response.data;

        const carTypeOptions = carTypes.map(carType => {
          const option = {
            text: carType.carType,
            value: carType.id
          };

          return option;
        });

        this.setState({ carTypeOptions: carTypeOptions, activeLoader: false });
      })
      .catch(error => {
        console.log("Car Types GET failed!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  addRentalCar = rentalCar => {
    console.log("Adding Rental Car: ", rentalCar);

    this.setState({ activeLoader: true });

    addRentalCarPost(rentalCar)
      .then(response => {
        console.log("POST success!");
        console.log(response);

        this.setState({ activeLoader: false });
        this.props.history.push("/cars");
      })
      .catch(error => {
        console.log("POST failed!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  getRentalCar = carId => {
    this.setState({ activeLoader: true });

    loadRentalCarGet(carId)
      .then(response => {
        console.log("GET by ID success!");
        console.log(response);

        this.loadForm(response.data);
        this.setState({ rentalCar: response.data, activeLoader: false });
      })
      .catch(error => {
        console.log("GET by ID failed!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  updateRentalCar = rentalCar => {
    console.log("Updating Rental Car: ", rentalCar);

    this.setState({ activeLoader: true });

    updateRentalCarPut(rentalCar)
      .then(response => {
        console.log("PUT success!");
        console.log(response);

        this.clearForm();
        this.setState({ updateMode: false, activeLoader: false });

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("PUT failed!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  componentDidMount() {
    console.log("RentalCarsForm component mounted");

    const carId = this.props.match.params.carId;

    this.loadCarTypes();

    if (carId) {
      console.log("RentalCarsForm carId: ", carId);

      this.getRentalCar(carId);
      this.setState({ updateMode: true });
    } else {
      this.setState({ updateMode: false });
    }
  }

  render() {
    const { carTypeOptions, activeLoader } = this.state;

    // console.log("render carTypeOptions: ", carTypeOptions);

    return (
      <div>
        <Header as="h1" content="Rental Cars Form!" textAlign="center" />
        <Container text style={{ marginTop: "7em" }} textAlign="left">
          <Dimmer active={activeLoader} onClickOutside={this.handleClose} page>
            <Loader />
          </Dimmer>
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
              <label>Make</label>
              <input
                placeholder="Make"
                value={this.state.make}
                onChange={e => {
                  this.setState({ make: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Model</label>
              <input
                placeholder="Model"
                value={this.state.model}
                onChange={e => {
                  this.setState({ model: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Year</label>
              <input
                type="number"
                placeholder="Year"
                value={this.state.year}
                onChange={e => {
                  this.setState({ year: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Color</label>
              <input
                placeholder="Color"
                value={this.state.color}
                onChange={e => {
                  this.setState({ color: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>VIN</label>
              <input
                placeholder="VIN"
                value={this.state.vin}
                onChange={e => {
                  this.setState({ vin: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Car Type</label>
              <Select
                placeholder="Select Car Type"
                options={this.state.carTypeOptions}
                onChange={(event, data) => {
                  // console.log("Select dropdown changed e: ", e);
                  // console.log("data: ", data);

                  this.setState({ carType: data.value });
                }}
                value={this.state.carType}
              />
            </Form.Field>
            <Button type="submit" onClick={this.handlerSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default RentalCarsForm;
