import React, { Component } from "react";
import axios from "axios";

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
  Item,
  Button,
  Loader,
  Dimmer
} from "semantic-ui-react";
import {
  listRentalCarsGet,
  removeRentalCarDelete
} from "../services/RentalCarsServer";

class RentalCarsInventory extends Component {
  state = {
    headerTitle: "",
    updateMode: null,
    deleteMode: null,
    rentalCarsInventory: [],
    activeLoader: null
  };

  handleClose = () => this.setState({ activeLoader: false });

  handlerUpdateRentalCar = rentalCar => {
    console.log("Rental Car to update: ", rentalCar);

    this.props.history.push(`/carform/${rentalCar.id}`);
  };

  handlerRemoveRentalCar = rentalCar => {
    console.log("Rental Car to remove: ", rentalCar);

    this.removeRentalCar(rentalCar);
  };

  listRentalCars = () => {
    this.setState({ activeLoader: true });

    listRentalCarsGet()
      .then(response => {
        console.log("GET success!");
        console.log(response);

        this.setState({
          rentalCarsInventory: response.data,
          activeLoader: false
        });
      })
      .catch(error => {
        console.log("GET success!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  removeRentalCar = rentalCar => {
    console.log("Removing Rental Car: ", rentalCar);

    this.setState({ activeLoader: true });

    removeRentalCarDelete(rentalCar.id)
      .then(response => {
        console.log("DELETE success!");
        console.log(response);

        this.setState({ deleteMode: false, activeLoader: false });

        this.props.history.push("/cars");
      })
      .catch(error => {
        console.log("DELETE failed!");
        console.log(error);

        this.setState({ activeLoader: false });
      });
  };

  componentDidMount() {
    console.log("RentalCarsInventory component mounted");

    this.listRentalCars();

    const { updateMode, deleteMode } = this.props;

    if (this.props.updateMode === true) {
      this.setState({
        updateMode: true,
        deleteMode: false,
        headerTitle: "Rental Cars Update!"
      });
    } else if (this.props.deleteMode === true) {
      this.setState({
        deleteMode: true,
        updateMode: false,
        headerTitle: "Rental Cars Remove!"
      });
    } else {
      this.setState({
        updateMode: false,
        deleteMode: false,
        headerTitle: "Rental Cars Inventory!"
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      console.log(
        "RentalCarsInventory component updated via props: ",
        this.props
      );

      if (this.props.updateMode === true) {
        this.setState({
          updateMode: true,
          deleteMode: false,
          headerTitle: "Rental Cars Update!"
        });
      } else if (this.props.deleteMode === true) {
        this.setState({
          deleteMode: true,
          updateMode: false,
          headerTitle: "Rental Cars Remove!"
        });
      } else {
        this.setState({
          updateMode: false,
          deleteMode: false,
          headerTitle: "Rental Cars!"
        });
      }

      this.listRentalCars();
    }
  }

  render() {
    const {
      headerTitle,
      updateMode,
      deleteMode,
      activeLoader,
      rentalCarsInventory
    } = this.state;

    console.log("render rentalCarsInventory: ", rentalCarsInventory);

    return (
      <div>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1" content={headerTitle} textAlign="center" />
        </Container>
        <Dimmer active={activeLoader} onClickOutside={this.handleClose} page>
          <Loader />
        </Dimmer>
        <Grid container columns={4}>
          {rentalCarsInventory.map(car => (
            <Grid.Column key={car.id}>
              <Item.Group>
                <Item>
                  <Item.Description>
                    <div>
                      {car.make} {car.model}
                    </div>
                    <div>
                      {car.year}, {car.color}
                    </div>
                  </Item.Description>
                </Item>
              </Item.Group>
              <Item.Group>
                {updateMode && (
                  <Button onClick={() => this.handlerUpdateRentalCar(car)}>
                    Update
                  </Button>
                )}
                {deleteMode && (
                  <Button
                    onClick={() => this.handlerRemoveRentalCar(car)}
                    negative
                  >
                    Delete
                  </Button>
                )}
              </Item.Group>
            </Grid.Column>
          ))}
        </Grid>
      </div>
    );
  }
}

export default RentalCarsInventory;
