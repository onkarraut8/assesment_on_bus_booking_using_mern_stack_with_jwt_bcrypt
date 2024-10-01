
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const HomePage = () => {

    const user = JSON.parse(sessionStorage.getItem("active-user"));
    const token = sessionStorage.getItem("jwtToken");

    const [data, setData] = useState([]);
    const [bus, setBus] = useState(null);
    const [remain, setRemain] = useState(0);



    // State to manage form fields
    const [formData, setFormData] = useState({
        id: "",
        name: 'ABC',
        mobileNo: '',
        date: '',
        noOfSeats: ''
    });

    // Handle input change
    const handleChange = (event) => {
        //const { name, value } = event.target;
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/book/all', {
                headers: {
                    'x-access-token': token
                }
            });
            setData(response.data);
        } catch (err) {
            //alert("Please Login to Book !");
            console.log(err.message);
        }
    };

    const checkUserAndBook = (e) => {
        if (user === null) {
            alert("Please Login to book seats !");

        } else {
            save(e)
        }
    }

    const getBus = () => {
        //e.preventDefault();
        axios.get(`http://localhost:5000/bus/gettodaybus`).then((resp) => {
            const status = resp.status;
            console.log("Response status:", status);
            setBus(resp.data);
            if (!resp.data) {
                setRemain(10 - 0);
            } else {
                setRemain(10 - resp.data.bookedSeats);
            }
        }).catch((error) => {
            setRemain(10 - 0);
            console.log("Response:", error);
        });



    }


    const cancel = async (id) => {
        //e.preventDefault();
        console.log("d " + id);
        try {
            const resp = await axios.delete(`http://localhost:5000/book/cancel/${id}`, {
                headers: {

                    'x-access-token': token
                }
            });
            console.log(resp.data);
            //alert("Delete " + resp.data);
            fetchData();
            getBus();
        } catch (err) {
            //alert("Delete error" + err.message);
        }
    }



    // Use effect to call fetchData when the component mounts
    useEffect(() => {
        fetchData();
        getBus();
    }, []);

    const calRemain = (e) => {
        if (bus !== null) {
            setRemain(10 - (parseInt(bus.bookedSeats) + (parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value))));
        } else {
            setRemain(10 - (0 + (parseInt(e.target.value) <= 0 ? 0 : parseInt(e.target.value))));
        }

    }

    const save = (e) => {
        e.preventDefault();
        //const token = localStorage.getItem('jwtToken'); 
        if (1 > formData.noOfSeats || 2 < formData.noOfSeats) {
            alert("You only book 1 0r 2 seats");
        }
        fetch("http://localhost:5000/book/save", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token // Include the token in the header
                /* 'Authorization': `Bearer ${token}` */
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response + " 1");
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //alert("Result " + data);
                console.log("response :" + data);
                //setResponse(data);
                setFormData({
                    id: "",
                    name: 'ABC',
                    mobileNo: '',
                    date: '',
                    noOfSeats: ''
                });
                fetchData();
                getBus();

            }).catch(err => {
                alert("Error " + err.message);
                console.error('Error:', err);

            });

    };

    return (

        <div className="container mt-4">
            <h2>Book Bus</h2>
            <form onSubmit={checkUserAndBook}>

                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div className="mb-3">
                                <label htmlFor="mobileNo" className="form-label">Mobile No.</label>
                                <input
                                    type="tel"
                                    id="mobileNo"
                                    name="mobileNo"
                                    className="form-control"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div className="mb-3">
                                <label htmlFor="noOfSeats" className="form-label">No. Of Seats</label>
                                <input
                                    type="number"
                                    id="noOfSeats"
                                    name="noOfSeats"
                                    max="2"
                                    min="0"
                                    className="form-control"
                                    value={formData.noOfSeats}
                                    onChange={(e) => {
                                        handleChange(e);
                                        calRemain(e);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <label htmlFor="noOfSeats" className="form-label mx-4">Remaining Seats: {remain}</label>
                <button type="submit" className="btn btn-primary mx-4">Book</button>
            </form>

            <table class="table" style={{ height: "250px" }}>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile No.</th>
                        <th scope="col">No. of Seats</th>
                        <th scope="col">Date</th>
                        <th scope="col">Cancel Seat</th>
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
                            <td><button className='btn btn-primary' onClick={() => cancel(item._id)}>Cancel</button></td>
                        </tr>
                    ))}



                </tbody>
            </table>
        </div>

    )
};




export default HomePage;


