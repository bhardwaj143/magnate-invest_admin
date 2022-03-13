import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "./Popover.css";

const ModifiedPopover = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p
        id={`x-${props.id}`}
        className="popOver"
        onMouseEnter={(e) => setOpen(true)}
        onMouseLeave={(e) => setOpen(false)}
      >
        {props.body
          ? props.body.length > 40
            ? props.body.slice(0, 40) + "..."
            : props.body
          : null}
      </p>
      <Popover placement="bottom" isOpen={open} target={`x-${props.id}`}>
        <PopoverHeader>{props.heading}</PopoverHeader>
        <PopoverBody>{props.body}</PopoverBody>
      </Popover>
    </>
  );
};

export default ModifiedPopover;
