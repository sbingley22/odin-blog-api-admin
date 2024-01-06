import { useEffect, useState } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import { Button } from "react-bootstrap"

export default function Comments() {
  const [comments, setComments] = useState(null)
  const [error, setError] = useState(null)
  const { blogid } = useParams()
  const [reload, setReload] = useState(false)
  const navigate = useNavigate()

  const commentUrl = import.meta.env.VITE_API_URL + 'users/dashboard/' + blogid.slice(1) + "/comments"

  useEffect(()=>{
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      //redirect to login
      console.log("No token")
      navigate('/');
      return
    }

    fetch(commentUrl, {
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
    }).then((commentData) => {
      setComments(commentData)
      setError(null)
      console.log(commentData)
    }).catch((error) => {
      setError(error.message)
    })
  },[reload])

  const gotoDashboard = () => {
    navigate('/dashboard')
  }

  const deleteComment = async (commentId) => {
    // Tell server to delete the comment
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      console.log("No token")
      navigate('/');
      return
    }

    try {
      const response = await fetch(commentUrl+"/"+commentId, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (response.status == 200){
        // Reload page
        setReload(!reload)
      } else {
        console.error("failed to delete comment")
      }

    } catch (err) {
      console.error("Error deleteing comment")
    }
  }

  return (
    <div className="p-4">
      <h2 onClick={gotoDashboard}>Dashboard</h2>
      <h3>Comments</h3>
      <div>
        {comments &&
          comments.map( c => (
            <div key={c._id} className="border border-primary p-2 m-1">
              <p>{c.name}</p>
              <p>{c.content}</p>
              <Button variant="secondary" onClick={() => deleteComment(c._id)}>
                Delete
              </Button>
            </div>
          ))
        }
      </div>
      {error &&
        <p>{error}</p>
      }
    </div>
  )
}
