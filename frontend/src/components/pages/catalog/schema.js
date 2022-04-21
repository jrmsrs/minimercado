import * as Yup from 'yup'

function schema(obj){
    switch (obj) {
        /**/
        case 'sector': 
            return Yup.object().shape({
                name: Yup.string().min(5).required(),
            })
        case 'category':
            return Yup.object().shape({
                name: Yup.string().min(5).required(),
                sector: Yup.number().required(),
            })
        case 'product':
            return Yup.object().shape({
                name: Yup.string().min(5).required(),
                price: Yup.number().positive().required(),
                category: Yup.number(),
            })
        case 'sale':
            return Yup.object().shape({
                product: Yup.number().required(),
                qty: Yup.number().positive().required(),
            })
        /**/
        default:
            return Yup.object().shape({});
    }
}

export default schema