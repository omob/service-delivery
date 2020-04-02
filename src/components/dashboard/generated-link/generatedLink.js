import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const GeneratedLink = ({ link }) => {
  return (
    <Fragment>
      <h3>Form Completed</h3>
      <p>
        Copy Generated Link
        <Link to="">{link}</Link>
      </p>
    </Fragment>
  );
};

export default GeneratedLink;
