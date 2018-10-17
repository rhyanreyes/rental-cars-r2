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
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const style = {
  h1: {
    marginTop: "3em"
  },
  h2: {
    margin: "4em 0em 2em"
  },
  h3: {
    marginTop: "2em",
    padding: "2em 0em"
  },
  last: {
    marginBottom: "300px"
  }
};

class RentalCarsMenuPage extends Component {
  state = {
    showRentalCarsInv: null
  };

  handlerToggleMenu = () => {
    const { showRentalCarsInv } = this.state;

    this.setState(
      {
        showRentalCarsInv: !showRentalCarsInv
      },
      () => {
        console.log("showRentalCarsInv state: ", showRentalCarsInv);
      }
    );
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
              {/* <Image
                size="mini"
                // src="/images/B3mOD8fH_400x400.jpg"
                style={{ marginRight: "1.5em" }}
              /> */}
              {/* <Image
                size="mini"
                src="/logo.png"
                style={{ marginRight: "1.5em" }}
              /> */}
              Rental Cars
            </Menu.Item>
            <Menu.Item as="a">Home</Menu.Item>

            <Dropdown item simple text="Dropdown">
              <Dropdown.Menu>
                <Dropdown.Item onClick={this.handlerToggleMenu}>
                  Rental Cars Inventory
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className="dropdown icon" />
                  <span className="text">Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu>
        <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>
          {/* {showRentalCarsInv && <RentalCarsInventory />} */}

          {/* <Image
            src="/images/wireframe/media-paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          /> */}
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
            <Image centered size="mini" src="/logo.png" />
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

export default RentalCarsMenuPage;
