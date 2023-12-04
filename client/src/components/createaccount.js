import React from 'react';
import { useState } from 'react';
import {Card} from './context';

//const baseUrl = process.env.REACT_APP_PORT;
const baseUrl = process.env.PORT || 'http://localhost:3500';

export function CreateAccount({ initializeUser, createWithFirebase }) {
  const [show, setShow] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validate(field, label) {
      if (!field) {
          setStatusMessage('Error: ' + label + ' please fill in all fields');
          setTimeout(() => setStatusMessage(''), 3000);
          return false
      }
      return true;
  }
// validate user and push to database

async function handleCreate() {
  if (!validate(name, 'Name')) return;
  if (!validate(email, 'Email')) return;
  if (!validate(password, 'Password')) return;
  if (password.length < 10) {
      setStatusMessage('Password must be 10 or more characters')
      return;
  }

  console.log('email in handleCreate', email)
  console.log('password in handleCreate', password)

  createWithFirebase(email, password)

  const url = `${baseUrl}/account/create/${name}/${email}/${password}`;
  await fetch(url);

  await initializeUser(email, password)
  setStatusMessage('Account creation successful!')
  setShow(false);

}

function clearForm() {
  setName('');
  setEmail('');
  setPassword('');
  setStatusMessage('');
  setShow(true);
}

 
return (
  <Card
      bgcolor="warning"
      header='Create Account'
      status={statusMessage}
      body={show ? (
          <>
              Name
              <br />
              <input
                  type="input"
                  className="form-control"
                  id="name"
                  placeholder="Enter Name"
                  value={name}
                  onChange={e => setName(e.currentTarget.value)}
              />
              <br />
              Email address
              <br />
              <input
                  type="input" className="form-control"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={e => setEmail(e.currentTarget.value)}
              />
              <br />
              Password
              <br />
              <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={e => setPassword(e.currentTarget.value)}
              />
              <br />
              <button
                  type="submit"
                  className="btn btn-light"
                  onClick={handleCreate}
                  disabled={name + email + password === ''}>
                  Create Account
              </button>
          </>
      ) : (
          <>
              <h5>Success</h5>
              <button
                  type="submit"
                  className="btn btn-light"
                  onClick={clearForm}
              >
                  Add Another Account
              </button>

          </>
      )}
  />
)
}
