function Modal({children, object, index, name}) {

    const objLabel = switchObjLabel()

    function switchObjLabel() {
        switch (object) {
            case 'sector':
                return 'o setor'
            case 'category':
                return 'a categoria'
            case 'product':
                return 'o produto'
            case 'sale':
                return 'a venda'
            default:
                return 'invalid'
        }
    }

    return (
        <div className="modal fade" id={"staticBackdrop"+index} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-primary" >
                <div className="modal-header" style={{borderBottom: "1px solid #000"}}>
                    <h5 className="modal-title text-light" id="staticBackdropLabel">Remover {objLabel.substring(2)}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Desejas remover {objLabel} {name}?
                </div>
                <div className="modal-footer" style={{borderTop: "1px solid #000"}}>
                    <button type="button" className="btn btn-dark" data-bs-dismiss="modal">Cancelar</button>
                    {children}
                </div>
                </div>
            </div>
        </div>
    );
  }
  
  export default Modal;