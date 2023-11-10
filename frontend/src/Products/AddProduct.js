import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [product, setProduct] = useState({});
  const inputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });

    console.log(product);
  };
  const imageHandler = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
    console.log(product.image);
  };

  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveEmployee = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('name', product.name);
    formData.append('price', product.price);
    // event.preventDefault();
    axios
      .post(
        'https://ecommerce-s2.onrender.com/api/products/addProduct',
        formData
      )
      //   .post('http://localhost:8080/api/products/addProduct', formData)
      .then(() => {
        event.preventDefault();
        console.log('Data Added');
        navigate('/products');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Add Employee</h1>
      {/* {loading ? <Spinner /> : ''} */}

      <>
        <form onSubmit={handleSaveEmployee} encType="multipart/form-data">
          <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Name</label>
              <input
                type="text"
                value={product.name}
                name="name"
                onChange={inputChange}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Price</label>
              <input
                type="number"
                value={product.price}
                name="price"
                onChange={inputChange}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>

            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Image</label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                // value={employee?.bio}
                name="image"
                onChange={imageHandler}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>
            <button className="p-2 bg-sky-300 m-8" type="submit">
              Add Product
            </button>
          </div>
        </form>
      </>

      {/* <div className="font-bold text-center text-xl">
          You have to be an Admin to add employee
        </div>
    */}
    </div>
  );
};

export default AddProduct;
