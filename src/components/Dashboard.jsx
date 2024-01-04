import { useState, useEffect } from "react"
import serverDetails from "../serverDetails"
import { useNavigate } from 'react-router-dom';

const dashboardUrl = serverDetails.api_url + 'users/dashboard'

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
  })

  return (
    <div>
      <h2>Dashboard</h2>
      {data ? (
        <div>
          {/* Display dashboard data here */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
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