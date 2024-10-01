
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const AdminPage = () => {


  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);

  const user = JSON.parse(sessionStorage.getItem("active-user"));
  const [total, setTotal] = useState(10);
  const [booked, setBooked] = useState(0);
  const [remain, setRemain] = useState(0);
  const token = sessionStorage.getItem("jwtToken");

  useEffect(() => {
    fetchData();
    fetchUserData();
    getBus();
  }, []);





  const getBus = () => {
    //e.preventDefault();
    axios.get(`http://localhost:5000/bus/gettodaybus`).then((resp) => {
      const status = resp.status;
      console.log("Response status:", status);
      if (!resp.data) {
        setBooked(0);
        setRemain(10 - 0);
      } else {
        setRemain(10 - resp.data.bookedSeats);
        setBooked(resp.data.bookedSeats);
      }
    }).catch((error) => {
      setRemain(10 - 0);
      setBooked(0);
      console.log("Response:", error);
    });



  }

  const fetchData = async () => {
    try {
      //const token = localStorage.getItem('jwtToken'); 
      const response = await axios.get('http://localhost:5000/admin/allBooking', {
        headers: {
          /* 'Authorization': `Bearer ${token}` */
          'x-access-token': token // Include the token in the header
        }
      });
      setData(response.data);
    } catch (err) {
      //alert("Error " + err.message);
      console.log(err.message);
    }
  };


  const fetchUserData = async () => {
    try {
     
      const response = await axios.get('http://localhost:5000/admin/users', {
        headers: {
          
          'x-access-token': token // Include the token in the header
        }
      });
      setUserData(response.data);
    } catch (err) {
      alert("Error " + err.message);
      console.log(err.message);
    }
  };
















  return (

    <div className="container mt-4">
      <h2>Admin Page</h2>

      <div className="container">
        <div className="row">
          <div className="col">
            <h4>Total Seats :{total}</h4>
          </div>
          <div className="col">
            <h4>Booked Seats :{booked}</h4>
          </div>
          <div className="col">
            <h4>Remain Seats :{remain}</h4>
          </div>
        </div>

      </div>



      <div className="container mt-4">

        <div className="row">
          <div className="col">
            <h4>Booking</h4>
            <table class="table" style={{ height: "250px" }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Mobile no</th>
                  <th scope="col">no of seats</th>
                  <th scope="col">date</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.noOfSeats}</td>
                    <td>{item.date}</td>
                  </tr>
                ))}



              </tbody>
            </table>
          </div>
          <div className="col">
            <h4>Users</h4>
            <table class="table" style={{ height: "250px" }}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Mobile no</th>
                  <th scope="col">email</th>
                </tr>
              </thead>
              <tbody>
                {userData.map(item => (
                  <tr key={item}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.mobileNo}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}



              </tbody>
            </table>
          </div>
        </div>

      </div>




    </div>

  )
};




export default AdminPage;
/* export {home}; */

