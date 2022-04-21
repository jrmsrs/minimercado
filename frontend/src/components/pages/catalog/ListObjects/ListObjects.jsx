import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Modal from '../../../layout/Modal'

function ListObjects() {

    const { table } = useParams()
    const tableLabel = switchTableLabel()
    const [objects,setObjects]=useState([])

    function handleDelete(table,id) {
        console.log("removeu "+table+"/"+id)
    }

    function switchTableLabel() {
        switch (table) {
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
      fetch(`${global.$baseUrl}/${table}`)
        .then(res => res.json())
        .then(data => setObjects(data))
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        tableLabel === 'invalid'?
        <>
            <h1 className="text-light font-weight-light"> 404 - Objeto {table} não existe </h1>
        </>:
        table === 'product'?
        <>
            <div className='row'>
            {objects.map( product => 
                <div key={product.id} id={product.id} className="col-6 col-sm-4 col-md-3 col-xl-2 mb-4">
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
                        <div className="card-header text-dark">
                            <a 
                            href={'https://wa.me/?text=Olá! Eu tenho interesse em ' + product.name.toUpperCase()} 
                            className="btn btn-primary btn-sm mb-2 w-100" 
                            target="_blank" rel="noreferrer">
                                Comprar
                            </a>
                            <span>admin:</span>
                            <Link 
                              className="btn btn-sm btn-outline-primary" 
                              style={{margin:"0 3px", padding:"0 7px"}} 
                              to={`/update/${table}/${product.id}`}
                            >
                                Upd
                            </Link>
                            <span
                              className="btn btn-sm btn-outline-danger" 
                              style={{margin:"0 3px", padding:"0 7px", cursor: "pointer"}} 
                              data-bs-toggle="modal" 
                              data-bs-target={"#staticBackdrop"+product.id}
                            >
                                Rmv
                            </span>
                        </div>
                    </div>
                    <Modal object={table} name={product.name} index={product.id}>
                        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(table,product.id)}>
                            Remover
                        </button>
                    </Modal>
                </div>
            )}
            </div>
        </>:
        <>
            <h1 className="text-light font-weight-light"> {tableLabel} </h1>

            <ul className='list-group'>
            {objects.map( object => 
                <li
                  key={object.id} 
                  id={object.id}
                  className="bg-dark text-light list-group-item d-flex justify-content-between" 
                  
                >
                    <span>{object.name}</span>
                    <span>
                        <Link 
                          className="ps-2 link-secondary text-decoration-none" 
                          to={`/update/${table}/${object.id}`}
                        >
                            Upd
                        </Link>
                        <span 
                          className="ps-2 link-danger text-decoration-none" 
                          style={{cursor: "pointer"}} 
                          data-bs-toggle="modal" 
                          data-bs-target={"#staticBackdrop"+object.id}
                        >
                            Rmv
                        </span>
                    </span>
                    <Modal object={table} name={object.name} index={object.id}>
                        <button type="button" className="btn btn-danger" onClick={()=>handleDelete(table,object.id)}>
                            Remover
                        </button>
                    </Modal>
                </li>
            )}
            </ul>
            
        </>
    )
  }

export default ListObjects