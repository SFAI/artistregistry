import React from "react";

export default function ConfirmEmail() {
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
      <a className="mustard" href="/artists/confirmation/new">
        Didn’t receive email?
      </a>
    </div>
  );
}
