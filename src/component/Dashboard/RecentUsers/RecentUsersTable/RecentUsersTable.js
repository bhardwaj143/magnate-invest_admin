import React from "react";
import One from "./img/profile.png";
import TableAction from "../../../ReusableComponents/Actions/TableAction";

const RecentUsersList = (props) => {
  const tableAction = [{ name: "update" }];

  return (
    <>
      <tr className="unread">
        <td>
          <img
            className="rounded-circle"
            style={{ width: "50px", height: "50px" }}
            src={One}
            alt="activity-user"
          />
        </td>
        <td>
          <h6 className="mb-1">{props.name}</h6>
        </td>
        <td>
          <h6 className="mb-1">{props.email}</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">1</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">20</h6>
        </td>
        <td style={{ textAlign: "center" }}>
          <h6 className="mb-1">50</h6>
        </td>
        <td>
          <TableAction data={tableAction} />
        </td>
      </tr>
    </>
  );
};

export default RecentUsersList;
