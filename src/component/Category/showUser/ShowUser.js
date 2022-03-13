import React from "react";
import { useHistory } from "react-router-dom";
import {
  CardBody,
  CardFooter,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  Row,
} from "reactstrap";

const AddUser = (props) => {
  const history = useHistory();

  return (
    <>
      <Form>
        <CardBody>
          <Row>
            <FormGroup className="col-6 col-md-6">
              <Label>Name</Label>
              <Input
                type="text"
                disabled={true}
                placeholder="Name"
                value={props.name}
              />
            </FormGroup>
            <FormGroup className="col-6 col-md-6">
              <Label>Mobile Number</Label>
              <Input
                type="text"
                disabled={true}
                placeholder="Mobile Number"
                value={props.mobile}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="col-12">
              <Label>Address</Label>
              <Input
                type="textarea"
                row={3}
                disabled={true}
                value={props.address}
              >
                {props.address}
              </Input>
            </FormGroup>
          </Row>
        </CardBody>
        <CardFooter>
          <Button
            type="submit"
            color="primary"
            onClick={(e) => history.push(`/update-user/${props.id}`)}
          >
            Edit
          </Button>
          <Button
            type="button"
            color="danger"
            onClick={(e) => history.push("/users/1")}
          >
            Back
          </Button>
        </CardFooter>
      </Form>
    </>
  );
};

export default AddUser;
