import React, { Component } from "react";
import { Container, Button, Checkbox, Form } from "semantic-ui-react";

class RentalCarTypesForm extends Component {
  state = {
    carType: ""
  };

  handlerSubmitButton = () => {
    console.log("Submit button clicked");
  };

  render() {
    const { carType } = this.state;

    return (
      <div>
        <h1>Rental Car Types Form!</h1>
        <Container text>
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
              <label>Car Type</label>
              <input
                placeholder="Car Type"
                value={carType}
                onChange={e => this.setState({ carType: e.target.value })}
              />
            </Form.Field>
            <Button type="submit" onClick={this.handlerSubmitButton}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

export default RentalCarTypesForm;
