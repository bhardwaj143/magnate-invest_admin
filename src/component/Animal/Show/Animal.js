import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Card, CardHeader } from "reactstrap";
import ModifiedLoader from "../../ReusableComponents/Loader/loader";
import ShowAnimal from "./ViewAnimal/ViewAnimal";
import ServerError from "../../ReusableComponents/ErrorPage/ServerError/ServerError";
import NoDataError from "../../ReusableComponents/ErrorPage/NoDataError/NoDataError";
import { useParams } from "react-router-dom";
import { gettingAnimal } from "../../../redux/actions/animalAction";

const User = (props) => {
  const { id } = useParams();
  // const query = useQuery();
  // const id = query.get("id") || "";
  // const [fName, setFname] = useState("");
  // const [lName, setLname] = useState("");
  // const [email, setEmail] = useState("");
  const [pageLoader, setPageLoader] = useState(true);
  const [errorCode, setErrorCode] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setPageLoader(true);
    const res = await props.getAnimal(id);
    if (res.code && (res.code === 404 || res.code === 400)) {
      setErrorCode(res.code);
    } else if (res.status && res.status === 500) {
      setErrorCode(res.status);
    }
    setPageLoader(false);
  };

  // console.log(props.animal);

  return (
    <>
      <Card>
        <CardHeader>
          <h3>Animal Detail</h3>
        </CardHeader>
        {pageLoader ? (
          <ModifiedLoader />
        ) : errorCode === 500 ? (
          <ServerError />
        ) : errorCode === 404 ? (
          <NoDataError />
        ) : (
          <ShowAnimal
            name={
              props.animal &&
              props.animal.animalDetail &&
              props.animal.animalDetail.name
                ? props.animal.animalDetail.name
                : "N/A"
            }
            image={
              props.animal &&
              props.animal.animalDetail &&
              props.animal.animalDetail.photo
                ? props.animal.animalDetail.photo
                : null
            }
            breed={
              props.animal &&
              props.animal.animalDetail &&
              props.animal.animalDetail.breed
                ? props.animal.animalDetail.breed
                : "N/A"
            }
            lVaccinated={
              props.animal &&
              props.animal.lastVaccinated
                ? props.animal.lastVaccinated
                : "N/A"
            }
            nVaccinated={
              props.animal &&
              props.animal.nextDueDate
                ? props.animal.nextDueDate
                : "N/A"
            }
            produceMilk={
              props.animal && props.animal.produceMilk === true ? "Yes" : "No"
            }
            baby={
              props.animal && props.animal.has_a_baby === true ? "Yes" : "No"
            }
            heatDate={
              props.animal && props.animal.last_heat_date
                ? props.animal.last_heat_date
                : "N/A"
            }
          />
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    animal: state.animal.animal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAnimal: (data) => dispatch(gettingAnimal(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
