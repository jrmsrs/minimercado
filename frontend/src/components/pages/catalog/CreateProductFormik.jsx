import { Formik, Field, Form, ErrorMessage } from 'formik'
import schema from './schema'
import React, { useEffect, useState } from 'react'

function CreateProductFormik() {

    const [form,setForm]=useState([])
    const [fk,setFk]=useState([])
        
    useEffect(()=>{
        fetch(`${global.$baseUrl}/sale`,{method:'options'})
        .then(res => res.json())
        .then(function(data){
            // checar se tem campo chave estrangeira
            const fieldsData=data.actions.POST
            const arr=[]
            for (const key in fieldsData) {    
                arr.push(Object.assign(fieldsData[key], {name: key}));
            }
            let fkField 
            arr.map( (field) => {
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
    },[])
    
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
        console.log('SUBMIT',values)
    }
    //let fkName=''
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
    <>
        <h1 className="text-light font-weight-light">Adicionar produto</h1>
        
        <Formik 
          initialValues={defaultValuesClear()}
          validationSchema={schema}
          onSubmit={onSubmit}
          validateOnMount
          enableReinitialize
        >
        {
            ({ values, errors, touched, isValid }) => (
            <Form>
                {getObjArray().map( (field) => 
                <React.Fragment key={field.name}>
                    <div className={field.read_only?"fields d-none":"fields mb-3"}>
                        <label 
                          className=""
                          htmlFor={field.name} 
                        >
                            Sim
                        </label>
                        <Field 
                          readOnly={field.read_only}
                          disabled={field.read_only}
                          className="form-control form-control-sm"
                          name={field.name} 
                          id={field.name} 
                          placeholder={field.type!=='field'?field.label:""} 
                          type={field.type!=='field'?switchFieldType(field.type):""} 
                          step={field.type==='decimal'?'0.05':''} 
                          as={field.type==='field'?'select':''}
                        >
                            {field.type==='field'?
                            <>
                                <option value="" disabled defaultValue hidden>{field.label}</option>
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

export default CreateProductFormik