import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormComponent } from './form/Form';
import Container from 'react-bootstrap/Container';
import { Todolist } from './components/todolist/Todolist';
import { TodoContext } from './store/TodoContext';
import { useState } from 'react';
function App() {

  const [edit, SetEdit] = useState()
  

  return (
    <TodoContext>     
      <Container>
        <h1 className='mb-4 fw-bold'>Todo List</h1>
        <FormComponent edit={edit} setEdit={SetEdit}/>
        <Todolist setEdit={SetEdit}/> 
      </Container>
    </TodoContext>
  )
}

export default App
