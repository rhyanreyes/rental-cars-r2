import React, { Component } from "react";
import {
  Container,
  Form,
  Icon,
  Label,
  Menu,
  Table,
  Button
} from "semantic-ui-react";
import {
  listRentalCarTypesGet,
  addRentalCarTypePost,
  updateRentalCarTypePut
} from "../services/RentalCarsServer";

class RentalCarTypes extends Component {
  state = {
    editTableCell: null,
    carTypes: [],
    tableCellValue: ""
  };

  handlerTableCell = carType => {
    console.log("Table Cell clicked: ", carType);

    if (carType === 0) {
      this.setState({ editTableCell: 0 });
    } else {
      this.setState({
        editTableCell: carType.id,
        tableCellValue: carType.carType
      });
    }
  };

  handlerCellKeyDown = event => {
    // console.log("Key was pressed. Key: ", event.key);
    // console.log("event: ", event);

    const { editTableCell, tableCellValue, carTypes } = this.state;

    if (event.key === "Enter") {
      console.log("Enter key pressed");
      console.log("tableCellValue: ", tableCellValue);
    }

    if (event.key === "Enter" && editTableCell === 0) {
      const newCarType = { carType: tableCellValue };
      this.addCarType(newCarType);
    }

    if (event.key === "Enter" && editTableCell !== 0) {
      const updateCarType = { carType: tableCellValue, id: editTableCell };

      this.setState({ editTableCell: null });
      this.editCarType(updateCarType);
    }
  };

  showFirstRow = () => {
    const { carTypes, editTableCell } = this.state;
    let firstRow;

    // console.log("carTypes: ,", carTypes);
    // console.log("editTableCell: ", editTableCell);

    firstRow = null;

    if (carTypes.length === 0) {
      firstRow = (
        <Table.Row>
          <Table.Cell onClick={() => this.handlerTableCell(0)}>
            <i>Click to add a Car Type</i>
          </Table.Cell>
        </Table.Row>
      );
    }

    if (carTypes.length === 0 && editTableCell === true) {
      firstRow = (
        <Table.Row>
          <Table.Cell onClick={() => this.handlerTableCell(0)}>
            <Form>
              <input
                placeholder="Click to add a Car Type"
                onKeyDown={this.handlerCellKeyDown}
                onChange={e =>
                  this.setState({ tableCellValue: e.target.value })
                }
              />
            </Form>
          </Table.Cell>
        </Table.Row>
      );
    }

    return firstRow;
  };

  listCarTypes = () => {
    listRentalCarTypesGet()
      .then(response => {
        console.log("GET success!");
        console.log(response);

        this.setState({ carTypes: response.data });
      })
      .catch(error => {
        console.log("GET failed!");
        console.log(error);
      });
  };

  addCarType = carType => {
    console.log("Adding Car Type: ", carType);

    addRentalCarTypePost(carType)
      .then(response => {
        console.log("POST success!");
        console.log(response);

        this.setState({ editTableCell: null });
        this.listCarTypes();
      })
      .catch(error => {
        console.log("POST failed!");
        console.log(error);
      });
  };

  editCarType = carType => {
    console.log("Updating Car Type: ", carType);

    updateRentalCarTypePut(carType)
      .then(response => {
        console.log("PUT success!");
        console.log(response);

        this.setState({ editTableCell: null });
        this.listCarTypes();
      })
      .catch(error => {
        console.log("PUT failed!");
        console.log(error);
      });
  };

  componentDidMount() {
    this.listCarTypes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.carTypes !== prevState.carTypes) {
      const { carTypes } = this.state;

      console.log("carTypes: ", carTypes);
    }
  }

  render() {
    const { carTypes, editTableCell, tableCellValue } = this.state;
    const firstRow = this.showFirstRow();
    let addRow;

    if (editTableCell === 0) {
      addRow = (
        <Table.Row>
          <Table.Cell onClick={() => this.handlerTableCell(0)}>
            <Form>
              <input
                placeholder="Click to add a Car Type"
                onKeyDown={this.handlerCellKeyDown}
                onChange={e =>
                  this.setState({ tableCellValue: e.target.value })
                }
              />
            </Form>
          </Table.Cell>
        </Table.Row>
      );
    } else {
      addRow = (
        <Table.Row>
          <Table.Cell onClick={() => this.handlerTableCell(0)}>
            <i>Click to add a Car Type</i>
          </Table.Cell>
        </Table.Row>
      );
    }

    return (
      <div>
        <h1>Rental Car Types Table</h1>
        <Container text>
          {/* <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
                <Table.HeaderCell>Header</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Label ribbon>First</Label>
                </Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>

            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell colSpan="3">
                  <Menu floated="right" pagination>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron left" />
                    </Menu.Item>
                    <Menu.Item as="a">1</Menu.Item>
                    <Menu.Item as="a">2</Menu.Item>
                    <Menu.Item as="a">3</Menu.Item>
                    <Menu.Item as="a">4</Menu.Item>
                    <Menu.Item as="a" icon>
                      <Icon name="chevron right" />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table> */}

          {/* <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notes</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>No Action</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell>Approved</Table.Cell>
                <Table.Cell>Requires call</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell>Denied</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
              <Table.Row warning>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>No Action</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jamie</Table.Cell>
                <Table.Cell positive>Approved</Table.Cell>
                <Table.Cell warning>Requires call</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Jill</Table.Cell>
                <Table.Cell negative>Denied</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table> */}

          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Car Type</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {/* <Table.Row>
                <Table.Cell>John</Table.Cell>
                <Table.Cell>No Action</Table.Cell>
                <Table.Cell>None</Table.Cell>
              </Table.Row> */}
              {carTypes.map(carType => (
                <Table.Row key={carType.id}>
                  {editTableCell === carType.id && (
                    <Table.Cell onClick={() => this.handlerTableCell(carType)}>
                      <Form>
                        <input
                          value={tableCellValue}
                          onKeyDown={this.handlerCellKeyDown}
                          onChange={e =>
                            this.setState({ tableCellValue: e.target.value })
                          }
                        />
                      </Form>
                    </Table.Cell>
                  )}
                  {editTableCell !== carType.id && (
                    <Table.Cell onClick={() => this.handlerTableCell(carType)}>
                      {carType.carType}
                      <Button floated="right" negative>
                        Delete
                      </Button>
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
              {editTableCell === 0 && (
                <Table.Row>
                  <Table.Cell onClick={() => this.handlerTableCell(0)}>
                    <Form>
                      <input
                        placeholder="Click to add a Car Type"
                        onKeyDown={this.handlerCellKeyDown}
                        onChange={e =>
                          this.setState({ tableCellValue: e.target.value })
                        }
                      />
                    </Form>
                  </Table.Cell>
                </Table.Row>
              )}
              {editTableCell !== 0 && (
                <Table.Row>
                  <Table.Cell onClick={() => this.handlerTableCell(0)}>
                    <i>Click to add a Car Type</i>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Container>
      </div>
    );
  }
}

export default RentalCarTypes;
