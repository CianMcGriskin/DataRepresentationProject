import React, { useState } from 'react';
import axios from 'axios';

// CreateProduct component renders a form with four input fields: name, price, image, and barcode
function CreateProduct() {
  // State variables to store form field values
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [barcode, setBarcode] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Create an object with form data
    const product = {
      name,
      price,
      img,
      barcode,
    };

    // Send a POST request to the specified URL with the form data as the request body
    axios.post('http://localhost:4000/api/addProduct', product)
      .then((response) => {
        // Log the response data to the console
        console.log(response.data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
     <center>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} required/>
        </label>
        <br />
        <label>
          Price:
          <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} required/>
        </label>
        <br />
        <label>
          Image:
          <input type="text" value={img} onChange={(event) => setImg(event.target.value)} required/>
        </label>
        <br />
        <label>
          Barcode:
          <input type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)} required/>
        </label>
        <br />
        <a href="/">
            <button type="submit">Create Product</button>
        </a>
      </center>
    </form>
  );
}

export default CreateProduct;
