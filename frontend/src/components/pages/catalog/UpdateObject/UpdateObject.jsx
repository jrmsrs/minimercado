import { Formik, Field, Form, ErrorMessage } from 'formik'
import schema from '../schema'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function UpdateObject() {

    const { table, id } = useParams()
    const objLabel = switchObjLabel()

    const [form,setForm]=useState([])
    const [fk,setFk]=useState([])
    const [initVals,setInitVals]=useState([])
        
    useEffect(()=>{
                      
        fetch(`${global.$baseUrl}/${table}/${id}`,{method:'get'})
        .then(res => res.json())
        .then(data => setInitVals(data))
        fetch(`${global.$baseUrl}/${table}`,{method:'options'})
        .then(res => res.json())
        .then(function(data){
            // checar se tem campo chave estrangeira
            const fieldsData=data.actions.POST
            const arr=[]
            for (const key in fieldsData) {    
                arr.push(Object.assign(fieldsData[key], {name: key}));
            }
            let fkField 
            arr.forEach( (field) => {
                if (field.type==='field') fkField=field.name
            })
            setForm(fieldsData)
            // se tiver campo chave estrangeira
            if (fkField!=null)
                fetch(`${global.$baseUrl}/${fkField}`)
                .then(res => res.json())
                .then(data => setFk(data))
        })
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    function switchObjLabel() {
        switch (table) {
            case 'sector':
                return 'setor'
            case 'category':
                return 'categoria'
            case 'product':
                return 'produto'
            case 'sale':
                return 'venda'
            default:
                return 'invalid'
        }
    }
    
    function switchFieldType(type){
        // retorna formato de campos do django no mais adequado atributo type em HTML input
        switch (type) {
            case 'integer':
            case 'decimal':
                return 'number'
            case 'string': 
                return 'text'
            case 'field':
                return 'select'
            default:
                return type;
        }
    }

    function onSubmit(values) {
        console.log('SUBMIT',initVals)
    }

    function getObjArray(){
        const arr = [];
        for (const key in form) {    
            arr.push(Object.assign(form[key], {name: key}));
        }
        return arr;
    }


    return (
        objLabel === 'invalid'? 
        <>
            <h1 className="text-light font-weight-light"> 404 - Objeto {table} não existe </h1>
        </>:
        <>
            <h1 className="text-light font-weight-light"> Atualizar {objLabel} </h1>
            
            <Formik 
            initialValues={initVals}
            validationSchema={schema(table)}
            onSubmit={onSubmit}
            validateOnMount
            enableReinitialize
            >
            {
                ({ isValid  }) => (
                <Form>
                    {getObjArray().map( (field) => 
                    <React.Fragment key={field.name}>
                        <div className={field.read_only?"fields d-none":"fields mb-3"}>
                            <label 
                            htmlFor={field.name} 
                            >
                                {field.label}
                            </label>
                            <Field 
                              readOnly={field.read_only}
                              disabled={field.read_only}
                              className={field.type!=='field'?'form-control form-control-sm':'form-select form-select-sm'}
                              name={field.name} 
                              id={field.name} 
                              placeholder={field.type!=='field'?field.label:""} 
                              type={field.type!=='field'?switchFieldType(field.type):""} 
                              step={field.type==='decimal'?'0.05':''} 
                              as={field.type==='field'?'select':''}
                              
                            >
                                {field.type==='field'?
                                <>
                                    <option value={""} defaultValue>----</option>
                                    {fk.map((foreignKey)=><option key={foreignKey.id} value={foreignKey.id}>{foreignKey.name}</option>)}                            
                                </>
                                :null}
                            </Field>
                            <ErrorMessage name={field.name} />
                            
                        </div>
                    </React.Fragment>
                    
                    )}
                    <button className="btn btn-primary" type="submit" disabled={!isValid}>Enviar</button>
                </Form>
                )
            }
            </Formik>
        </>
    )
}

export default UpdateObject