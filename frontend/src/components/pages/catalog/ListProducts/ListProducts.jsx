import { useEffect, useState } from 'react'

function ListProducts() {
  
    const [products,setProducts]=useState([])
        
    useEffect(()=>{
      fetch('http://0.0.0.0:8000/api/product')
        .then(res => res.json())
        .then(data => setProducts(data))
    })
  
    return (
        <>
        <div style={{fontSize:"0.5rem"}}>&nbsp;</div>
        <div className='row'>
        {products.map( product => 
            <div key={product.id} className="col-6 col-sm-4 col-md-3 col-xl-2 mb-4">
                <div className="card mb-sm-2 h-100">
                    <img src="https://avatars.githubusercontent.com/u/38083522?v=4" className="card-img-top" alt="..." />
                    <div class="card-body text-dark">
                        <h6 class="card-title">
                            {product.name}
                        </h6>
                        <p class="card-text font-weight-normal">
                            {product.price}
                        </p>
                        
                    </div>
                    <div className="card-header">
                        <a 
                          href={'https://wa.me/?text=Olá! Eu tenho interesse em ' + product.name.toUpperCase()} 
                          className="btn btn-primary btn-sm" 
                          target="_blank" rel="noreferrer">
                            Comprar
                        </a>
                    </div>
                </div>
            </div>
        )}
        </div>
        </>
    )
  }

export default ListProducts