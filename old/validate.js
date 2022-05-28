export default function validate(values) {
    const errors = {}
    if (!values.title.trim()) {
        errors.title = 'Title is required'
    } else if (values.title.length < 10) {
        errors.title = 'Title minimum 10 characters'
    } else if (values.title.length > 20) {
        errors.title = 'Title maximum 20 characters'
    }

    if (!values.description) {
        errors.description = 'Description is required'
    } else if (values.description.length < 15) {
        errors.description = 'Description minimum 15 characters'
    } else if (values.description.length > 30) {
        errors.description = 'Description maximum 30 characters'
    }
    return errors
}