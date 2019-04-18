import React from "react";

export default function Unauthorized(props) {
  return (
    <div className="center mw6 pa4">
      <h1>Unauthorized Access</h1>
      <div className="mv4 bg-white pa4">
        <h2>You do not have user permissions to access this page.</h2>
        <p>
          Back to <a className="moss" href={`/`}> Home Page </a>
        </p>
      </div>
    </div>
  );
}
