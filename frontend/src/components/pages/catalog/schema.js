import * as Yup from 'yup'

export default Yup.object().shape({
    name: Yup.string().min(5).required(),
    price: Yup.number().positive().required(),
    qty: Yup.number().positive().required().integer(),
})