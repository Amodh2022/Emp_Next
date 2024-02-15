"use client"

import { DataTable } from 'primereact/datatable';


import React from 'react';
import { Column } from 'primereact/column';
import  { useState, useEffect } from 'react';

export default function Home(){
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://localhost:8088/humanresource/employees');
              console.log(response)
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const jsonData = await response.json();
              setProducts(jsonData);
              console.log(products)
              
            } catch (error) {
              
            } finally {
             
            }
          };
      
          fetchData();
    }, []);

    return(
        <DataTable value={products} tableStyle={{ minWidth: '50rem' }}>
    <Column field="code" header="Code">{products['firstName']}</Column>
    <Column field="name" header="Name"></Column>
    <Column field="category" header="Category"></Column>
    <Column field="quantity" header="Quantity"></Column>
</DataTable>
    )
}

