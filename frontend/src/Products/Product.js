import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import PulseLoader from 'react-spinners/PulseLoader';
function Product() {
  // console.log(user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    setLoading(true);
    axios
      .get('https://ecommerce-s2.onrender.com/api/products/viewProduct')
      //   .get('http://localhost:8080/api/products/viewProduct')
      .then((response) => {
        setProducts(response.data.data);
        console.log(response);

        // console.log(response.data);
        // console.log(employees);
      });
    setLoading(false);
  }, []);

  return (
    <>
      {/* {user == null && loading ? ( */}
      {products.length !== 0 ? (
        <>
          <div className="container-fluid">
            <div className="row">
              {products.map((item) => (
                <div key={item._id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <Card style={{ width: '18rem' }}>
                    <Card.Img
                      xs={6}
                      md={4}
                      className=""
                      variant="top"
                      //   src={item.image}
                      //   src={'/images/istockphoto.png'}
                      src={item.image || '/images/istockphoto.jpg'}
                      onError={(e) => {
                        e.target.src = '/images/istockphoto.jpg'; // Set the source to the default image if an error occurs
                      }}
                      //   onError={(e) => {
                      //     if (!item.image) {
                      //       e.target.src = '/images/istockphoto.jpg'; // Set the source to the default image if item.image is null or undefined
                      //     }
                      //   }}
                    />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{item.position}</Card.Text>
                      <Card.Text>{item.email}</Card.Text>
                      <Card.Text>{item.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className='spinner-container'>
          <div className="spinner">
            {/* <PacmanLoader color="#36d7b7" /> */}
            <PulseLoader
              color="#1e217d"
              cssOverride={{}}
              loading
              margin={0}
              size={30}
              speedMultiplier={1}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
