import { Formik, Field, Form, ErrorMessage } from 'formik'
import schema from '../schema'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function AddObject() {

    const navigate = useNavigate()
    const { table } = useParams()
    const tableLabel = switchObjLabel()

    const [form,setForm]=useState([])
    const [fk,setFk]=useState([])
        
    useEffect(()=>{
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
                if (field.type==='field') 
                    fkField=field.name
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

    async function onSubmit(values) {
        let errMsg=null
        try {
            const response = await fetch(`${global.$baseUrl}/${table}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(values)
            })
            if (!response.ok) throw Error("400, objeto com esse nome ja existe ou inseriu caracteres nao permitidos");
        } catch (err) {
            errMsg = err.message;
        } finally {
            errMsg===null ? navigate(`/list/${table}?success`) : console.log(errMsg)
        }
    }

    function defaultValuesClear(){
        const arr=[]
        getObjArray().forEach((value,i) => {
            // padrão: campo vazio
            arr[i] = [value.name,'']
            // campos especificos
            if (value.name==='qty') 
                arr[i] = [value.name,'1']
        });
        return Object.fromEntries(arr) 
    }

    function getObjArray(){
        const arr = [];
        for (const key in form) {    
            arr.push(Object.assign(form[key], {name: key}));
        }
        return arr;
    }

    return (
        tableLabel === 'invalid'? 
        <>
            <h1 className="text-light font-weight-light"> 404 - Tabela {table} não existe </h1>
        </>:
        <>
            <h1 className="text-light font-weight-light"> Adicionar {tableLabel} </h1>
            
            <Formik 
            initialValues={defaultValuesClear()}
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

export default AddObject