import React from "react";
import queryString from "query-string";
import { Fragment } from "react";
import './generatedLink.scss';
import launch from './launch.png';
// import { Link } from "react-router-dom";

const GeneratedLink = ({ location }) => {
  const { url } = queryString.parse(location.search);
  console.log(url);

  return (
    <Fragment>
      <div  className="col-box">
        <div className="u-center">
          <img src={ launch } alt="launch" className="launch" />
          <h3>Form Completed</h3>
          <p>Copy Generated Link</p>
          <code className='url'>{url}</code>
        </div>
      </div>
    </Fragment>
  );
};

export default GeneratedLink;
