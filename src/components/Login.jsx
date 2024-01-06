import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

const loginUrl = import.meta.env.VITE_API_URL + "users/login"

export default function Login() {
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    }

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // credentials checkout
        console.log("logged in")
        setErrors(null)
        const tokenData = await response.json()
        const token = tokenData.accessToken

        // Save the token in local storage
        localStorage.setItem('jwtToken', token)
        //console.log(token)

        // Navigate to /dashboard after successful login
        navigate('/dashboard');

      } else if (response.status == 400) {
        // username or password incorrect
        const errorData = await response.json()
        const errorMsg = errorData.error
        setErrors(errorMsg)
        console.log(errorMsg)
      }
      else {
        console.error("Failed to login due to server error")
      }
    } catch (error) {
      console.error("Error logging in")
    }
  }

  return (
    <div style={{ width: '50%', margin: 'auto', marginTop: '50px' }}>
      <h3>You must be an administrator to use this website.</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="username" placeholder="Enter your username" />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter your password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Login
        </Button>
      </Form>

      {errors && 
        <p>{errors}</p>
      }
    </div>
  );
}
