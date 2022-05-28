import { useState } from 'react'

function useForm(callback) {
  const [isSubmit, setIsSubmit] = useState(false)
  const [values, setValues] = useState({
    title: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  const validateFunc = (name, value) => {
    switch (name) {
      case 'title':
        if (!value.trim()) {
          setErrors(prev => (
            {...prev, title: 'Title is required'}
          ))
        } else if(value.length < 10) {
          setErrors(prev => (
            {...prev, title: 'Title minimum 10 characters'}
          ))
        } else if(value.length > 20) {
          setErrors(prev => (
            {...prev, title: 'Title maximum 20 characters'}
          ))
        } else {
          const {title, ...rest} = errors
          setErrors(prev => (
            {...prev, ...rest}
          ))
        }
        break;
      case 'description':
        if (!value.trim()) {
          setErrors(prev => (
            {...prev, description: 'Description is required'}
          ))
        } else if(value.length < 15) {
          setErrors(prev => (
            {...prev, description: 'Description minimum 15 characters'}
          ))
        } else if(value.length > 30) {
          setErrors(prev => (
            {...prev, description: 'Description maximum 30 characters'}
          ))
        } else {
          const {description, ...rest} = errors
          setErrors(prev => (
            {...prev, ...rest}
          ))
        }
        break;
      default:
        break;
    }
  }
  const handleChange = e => {
    e.persist()
    const {name, value} = e.target
    validateFunc(name, value)
    setValues(prevValue => (
        {...prevValue, [name]:value}
    ))
  }
  const handleSubmit = e => {
    if(e) e.preventDefault()
    if (Object.keys(errors).length === 0 && isSubmit) {
      callback()
    } else {
      // alert('There is an Error!')
    }
  }

  return { values, errors, handleChange, handleSubmit }
}

export default useForm