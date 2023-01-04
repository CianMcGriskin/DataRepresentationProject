import React, { useState, useEffect } from 'react';
import props from 'prop-types';
import axios from "axios";


export function ReadComponent() {

  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    }
    fetchData();
  }, []);

  return (
    <table>
  <thead>
    <tr>
      <th>Image</th>
      <th>Name</th>
      <th>Price</th>
      <th>Barcode</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
    {products.map(product => (
      <tr key={product._id}>
        <td>
          <img src={product.img}/>
        </td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.barcode}</td>
        <td>
          <button id="editButton" onClick={() => window.location.href=`/api/editProduct/${product._id}`}>Edit</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  );
}
