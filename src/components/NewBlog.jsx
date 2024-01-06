import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const newBlogUrl = import.meta.env.VITE_API_URL + 'users/newblog'

export default function NewBlog() {
  const navigate = useNavigate()

  const postBlog = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('jwtToken')
    if (!token) {
      console.log("No token")
      navigate('/');
      return
    }

    const formData = {
      title: e.target.elements.title.value,
      content: e.target.elements.content.value,
    }

    console.log(formData)

    try {
      console.log(newBlogUrl)
      const response = await fetch(newBlogUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("in2")

      console.log(response)
  
      if (response.ok) {
        console.log("Blog posted")
        navigate('/dashboard')
      } else if (response.status == 400) {
        console.error("Form incorrect")
      } else {
        console.error('Failed to save blog');
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  }

  const gotoDashboard = () => {
    navigate('/dashboard')
  }

  return (
    <div className="p-2">
      <h2 onClick={gotoDashboard}>Dashboard</h2>
      <h3>New Blog</h3>
      <Form onSubmit={postBlog}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter your title" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter your blog content" required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
