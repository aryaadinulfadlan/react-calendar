import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CalendarContextProvider } from './Context';
import { GlobalStyles } from './GlobalStyles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles/>
    <CalendarContextProvider>
      <App />
    </CalendarContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// const { values, errors, handleChange, handleSubmit } = useForm(formSubmitted)
// const handleSubmit = e => {
//   e.preventDefault()
//   setErrors(validate(values))
//   setIsSubmitted(true)
//   if (Object.keys(errors).length === 0 && isSubmitted) {
//       const newEvent = {
//           id: selectedEvent ? selectedEvent.id : nanoid(),
//           title: values.title,
//           description: values.description,
//           label: selectedLabel,
//           day: daySelected.valueOf()
//       }
//       if (selectedEvent) {
//           eventDispatch(updateEventAction(newEvent))
//       } else {
//           eventDispatch(addEventAction(newEvent))
//       }
//       setValues(defaultValue)
//       setSelectedLabel(labels[0])
//       setModal(false)
//   }
// }


// setNews(currentNews => {
//     return({
//         ...currentNews, 
//         status: status, 
//         totalResults: totalResults,
//         articles: [...currentNews.articles, ...articles]
//     })
// })