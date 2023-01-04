import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

// EditProduct component allows the user to edit the details of a product or delete the product
function EditProduct(props) {
  // Get the product ID from the URL parameters
  let {id} = useParams();

  // State variables to store the list of products, the selected product, and the form field values
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');
  const [barcode, setBarcode] = useState('');

  // Function to handle delete button click
  const handleDelete = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    try {
      // Send a DELETE request to the specified URL
      await axios.delete(`http://localhost:4000/api/editProduct/${id}`);
      // Redirect to the home page
      window.location.replace("http://localhost:3000");
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(()=>{
    axios.get('http://localhost:4000/api/editProduct/'+id)
    .then((response)=>{
      setName(response.data.name);
      setPrice(response.data.price);
      setImg(response.data.img);
      setBarcode(response.data.barcode);
    })
    .catch()
  },[]);

  // Function to handle the submit button
  async function handleSubmit(e) {
    e.preventDefault();
    const updatedProduct = { name, price, img, barcode };
    await axios.put(`http://localhost:4000/api/editProduct/${id}`, updatedProduct);
    window.location.replace("http://localhost:3000");
  }

  return (
    <form>
      <center>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      <br />
      <label>
        Image:
        <input type="text" value={img} onChange={(event) => setImg(event.target.value)} />
      </label>
      <br />
      <label>
        Barcode:
        <input type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)} />
      </label>
      <br />
      <button type="submit" onClick={handleSubmit}>Save Changes</button>
      <button id="deleteButton" onClick={handleDelete}>Delete</button>
      </center>
    </form>
  );
}

export default EditProduct;
