import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar'
import CreateProduct from './components/Create/Create'
import {ReadComponent} from './components/Read/Read'
import EditProduct from './components/Edit/Edit'

function App() {
  return (
    <BrowserRouter>
  <NavigationBar/>
<Routes>
  <Route path="/" element={<ReadComponent></ReadComponent>} />
  <Route path="/create" element={<CreateProduct></CreateProduct>} />
  <Route path='/api/editProduct/:id' element={<EditProduct></EditProduct>}></Route>
  </Routes>
  
</BrowserRouter>
  );
}

export default App;
