import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onSubmitHandler = (e) => {
    e.preventDefault();
    props.name(1, searchTerm);
  };

  return (
    <>
      {props.status !== 500 ? (
        <Form onSubmit={onSubmitHandler}>
          <FormGroup>
            <Input
              type="text"
              placeholder="Search By Name"
              className="col-12"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormGroup>
        </Form>
      ) : null}
    </>
  );
};

export default SearchBar;
