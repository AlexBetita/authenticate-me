// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [headline, setHeadline] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];

    if(password !== confirmPassword){
      newErrors.push('Confirm Password field must be the same as the Password field')
    }

    if(username !== username.toLowerCase()){
      newErrors.push('Username must be lower case')
    }

    if (!newErrors.length) {
      setErrors([]);
      await dispatch(sessionActions.createUser({ fullName, email, username, password, headline, website, profileImage }))
        .then(() => {
          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setUsername("");
          setHeadline("");
          setWebsite("");
          setProfileImage(null);
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            newErrors = data.errors;
            setErrors(newErrors);
          }
        });
      // history.push('/')
    }

    setErrors(newErrors)

    return setErrors
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setProfileImage(file);
  };

  return (
    <div>
      <h1>Sign up on Product Hunt Clone</h1>
      <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Headline
          <textarea
            type="textarea"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </label>
        <label>
          Upload a Profile Image
          <input type="file" onChange={updateFile} />
        </label>
        {/* <label>
            Multiple Upload
            <input
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormPage;
