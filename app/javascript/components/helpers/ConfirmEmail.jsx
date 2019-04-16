import React from "react";

export default function ConfirmEmail(props) {
  return (
    <div className="center mw6 pa4">
      <h1>Sign up</h1>
      <div className="mv4 bg-white pa4">
        <h2>Confirm your email</h2>
        <p>
          Please activate your account by clicking the link in the email we’ve
          sent you.
        </p>
      </div>
      <a className="moss mb1" href={`sign_in`}>
        Log in »
      </a> 
      <a className="moss" href={`confirmation/new`}>
        Didn’t receive email?
      </a>
    </div>
  );
}
