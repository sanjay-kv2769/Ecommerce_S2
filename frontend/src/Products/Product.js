import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Product() {
  // console.log(user);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    setLoading(true);
    axios
      .get('http://localhost:8080/api/products/viewProduct')
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
      {loading ? (
        <>
          <div className="flex justify-center content-center mt-5 ">
            <Spinner />
          </div>
          <div className="font-bold text-center text-xl">
            You have to login First
          </div>
        </>
      ) : (
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
      )}
    </>
  );
}

export default Product;
