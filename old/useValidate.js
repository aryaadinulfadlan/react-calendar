import {useState} from 'react'

function useValidate() {
    const initialValues = { title: '', description: '' };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target
        setFormValues(prev => (
            {...prev, [name]: value}
        ))
    }

    return { formValues, setFormErrors, setIsSubmit, handleChange, formErrors, isSubmit }
}

export default useValidate
// const { formValues, setFormErrors, setIsSubmit, handleChange, formErrors, isSubmit } = useValidate()
//   const handleSubmit = e => {
//     e.preventDefault()
//     setFormErrors(validate(formValues))
//     setIsSubmit(true)
//     if (Object.keys(formErrors).length === 0 && isSubmit) {
//         console.log('LOLOS VALIDASI KAMPANG !!')
//     }
//     // kalo pake cara ini maka harus doble klik baru nilai nya true
//     // karena pengecekan if dilakukan duluan dari pada setter state
//     // jadi nilai yg di komparasikan masih berupa nilai lama
//   }