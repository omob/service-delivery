import React from "react";
import queryString from "query-string";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const GeneratedLink = ({ location }) => {
  const { url } = queryString.parse(location.search);
  console.log(url);

  return (
    <Fragment>
      <div className="text-center">
        <h3>Form Completed</h3>
        <p>Copy Generated Link</p>
        <code>{url}</code>
      </div>
    </Fragment>
  );
};

export default GeneratedLink;
