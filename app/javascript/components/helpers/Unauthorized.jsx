import React from "react";

export default function Unauthorized(props) {
  return (
    <div className="center mw6 pa4">
      <h1>Page not available</h1>
      <div className="mv4 bg-white pa4">
        <h2>You do not have permissions to access this page.</h2>
        <p>
          Back to
          <a className="dib moss" href={`/`}>
            Home
          </a>
        </p>
      </div>
    </div>
  );
}
