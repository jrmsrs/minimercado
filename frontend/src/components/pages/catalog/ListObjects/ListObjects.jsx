import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ListObjects() {

    const { obj } = useParams()
    const objLabel = switchObjLabel()
    const [objects,setObjects]=useState([])

    function switchObjLabel() {
        switch (obj) {
            case 'sector':
                return 'setores'
            case 'category':
                return 'categorias'
            case 'product':
                return 'produtos'
            case 'sale':
                return 'vendas'
            default:
                return 'invalid'
        }
    }
        
    useEffect(()=>{
      fetch(`${global.$baseUrl}/${obj}`)
        .then(res => res.json())
        .then(data => setObjects(data))
    })
  
    return (
        objLabel === 'invalid'?
        <>
            <h1 className="text-light font-weight-light"> 404 - Objeto {obj} não existe </h1>
        </>:
        obj === 'product'?
        <>
            <div className='row'>
            {objects.map( product => 
                <div key={product.id} className="col-6 col-sm-4 col-md-3 col-xl-2 mb-4">
                    <div className="card mb-sm-2 h-100">
                        <img src="https://avatars.githubusercontent.com/u/38083522?v=4" className="card-img-top" alt="..." />
                        <div className="card-body text-dark">
                            <h6 className="card-title">
                                {product.name}
                            </h6>
                            <p className="card-text font-weight-normal">
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
        </>:
        <>
            <h1 className="text-light font-weight-light"> {objLabel} </h1>

            <ul className='list-group'>
            {objects.map( object => 
                <li
                  key={object.id} 
                  className="bg-dark text-light list-group-item d-flex justify-content-between" 
                  
                >
                    <span>{object.name}</span>
                    <span>
                        <Link className="ps-2 link-secondary text-decoration-none" to={`/list/${obj}/update/${object.id}`}>Upd</Link>
                        <Link className="ps-2 link-danger text-decoration-none" to={`/list/${obj}/remove/${object.id}`}>Rmv</Link>
                    </span>
                    
                </li>
            )}
            </ul>
        </>
    )
  }

export default ListObjects