import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, CardGroup } from "react-bootstrap";

const dashboardUrl = import.meta.env.VITE_API_URL + 'users/dashboard'

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      //redirect to login
      console.log("No token")
      navigate('/');
      return
    }

    fetch(dashboardUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Failed to fetch dashboard data')
      }
    }).then((dashboardData) => {
      setData(dashboardData)
    }).catch((error) => {
      setError(error.message)
    })
  },[])

  const publishBlog = async (id, published) => {
    // Tell server to publish / unpublish the blog
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      console.log("No token")
      navigate('/');
      return
    }

    const blogData = {
      id,
      published
    }

    try {
      const response = await fetch(dashboardUrl+"/"+id, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      })

      if (response.status == 200){
        // reload after successful update
        window.location.reload()
      } else if (response.status == 404){
        console.error("blog doesn't exist")
        window.location.reload()
      } else if (response.status == 400){
        console.error("Cant authenticate token")
        navigate('/');
      }
    } catch (error) {
      console.error("Error updating blog")
    }
  }

  const viewComments = (id) => {
    // View comments for the blog
    navigate(`/dashboard/:${id}/comments`);
  }

  const newBlog = () => {
    // View comments for the blog
    navigate(`/newblog`);
  }

  return (
    <div className="p-4">
      <h2>Dashboard</h2>
      {data ? (
        <div>
          <p>{data.welcome}</p>
          <div>
            <Button className="mb-4" variant="primary" onClick={newBlog}>
              Create New Blog
            </Button>
            <h3>Blogs</h3>
            <Row>
              {data.blogs.map(blog => (
                <Row key={blog._id}>
                  <CardGroup className="p-1">
                    <Card style={{ width: '18rem', height: '100%', border: '1px solid #000' }} >
                      <Card.Body>
                        <Card.Title>{blog.title}</Card.Title>
                        <Button 
                          onClick={()=>publishBlog(blog._id, !blog.published)}
                          className="m-1">
                          {blog.published ? "unpublish" : "publish"}
                        </Button>
                        <Button 
                          onClick={()=>viewComments(blog._id)}
                          className="m-1">
                          view comments
                        </Button>
                      </Card.Body>
                    </Card>
                  </CardGroup>
                </Row>
              ))}
            </Row>
          </div>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

}

export default Dashboard