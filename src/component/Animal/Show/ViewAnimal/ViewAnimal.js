import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  Spinner,
  Row,
} from "reactstrap";
import { connect } from "react-redux";
import { Breadcrumb } from "react-bootstrap";
import NoDataError from "../../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import ServerError from "../../../ReusableComponents/ErrorPage/ServerError/ServerError";
import ModifiedLoader from "../../../ReusableComponents/Loader/loader";
import * as constants from "../../../../constants/appConstants";
import "./show.css";
import * as functions from "../../../../functions/function";

const ShowAnimal = (props) => {
  const history = useHistory();

  const updatedDate = (data) => {
    if (data) {
      const str = data.split("T");
      if (str.length === 2) {
        const res = functions.dateFunction(str[0]);
        return res.date + " " + res.month + " , " + res.year;
      }
    }
  };

  // console.log(props)

  return (
    <>
      <Form>
        <CardBody>
          <div className="row">
            <div className="col-12 col-md-5 col-lg-4 col-xl-3 adjustAnimalImage">
              <img
                alt="Animal "
                src={props.image ? `${constants.baseURL}/${props.image}` : null}
                className="animalImage"
                height="auto"
              />
            </div>

            <div className="col-12 col-md-7 col-lg-8 col-xl-9">
              <Row>
                <FormGroup className="col-12 col-md-6">
                  <p> <strong>Name</strong> : {props.name} </p>
                  {/* <Label>Name</Label> */}
                  {/* <Input disabled={true} type="text" value={props.name} /> */}
                </FormGroup>

                <FormGroup className="col-12 col-md-6">
                <p> <strong>Breed</strong> : {props.breed} </p>
                  {/* <Label>Breed</Label>
                  <Input type="text" disabled={true} value={props.breed} /> */}
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                <p> <strong>Last Vaccinated</strong> : {props.lVaccinated ? updatedDate(props.lVaccinated) : "N/A"} </p>
                  {/* <Label>Last Vaccinated</Label>
                  <Input
                    type="text"
                    disabled={true}
                    value={
                      props.lVaccinated ? updatedDate(props.lVaccinated) : "N/A"
                    }
                  /> */}
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                <p> <strong>Next Vaccination Date</strong> : {props.nVaccinated ? updatedDate(props.nVaccinated) : "N/A"} </p>
                  {/* <Label>Next Vaccination Date</Label>
                  <Input
                    type="text"
                    disabled={true}
                    value={
                      props.nVaccinated ? updatedDate(props.nVaccinated) : "N/A"
                    }
                  /> */}
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                <p> <strong>Produce Milk</strong> : {props.produceMilk} </p>
                  {/* <Label>Produce Milk</Label>
                  <Input
                    type="text"
                    disabled={true}
                    value={props.produceMilk}
                  /> */}
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                <p> <strong>Has Baby</strong> : {props.baby} </p>
                  {/* <Label>Has Baby</Label>
                  <Input type="text" disabled={true} value={props.baby} /> */}
                </FormGroup>
                <FormGroup className="col-12 col-md-6">
                <p> <strong>Last Heat Date</strong> : {props.heatDate ? updatedDate(props.heatDate) : "N/A"} </p>
                  {/* <Label>Last Heat Date</Label>
                  <Input
                    type="text"
                    disabled={true}
                    value={props.heatDate ? updatedDate(props.heatDate) : "N/A"}
                  /> */}
                </FormGroup>
              </Row>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <Button
            type="button"
            color="danger"
            onClick={(e) => history.push(`/animals/1`)}
          >
            Back
          </Button>
        </CardFooter>
      </Form>
    </>
  );
};

export default ShowAnimal;
