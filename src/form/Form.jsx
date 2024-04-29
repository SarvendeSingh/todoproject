import React, { useState, useContext } from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormButton } from '../components/button/FormButton';
import { db } from '../config/firebase';
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import "./form.css";
import { useEffect } from 'react';
import { todoContext } from '../store/TodoContext';


export const FormComponent = ({edit, setEdit}) => {
    const { todolistData } = useContext(todoContext);

    const [todolist, setTodolist] = useState({namevalue:"", emailvalue:"", phonevalue:""})
    const [status,setStatus] = useState(false);
    const [error, setError] = useState({namevalue:"", emailvalue:"", phonevalue:""});

    const handleValue = (e) => {
        const {name, value} = e.target;        
        setTodolist(prev =>  ({...prev, [name]: value}));
        setError(prev => ({ ...prev, [name]: "" })); // Clear error when typing       
    }
    // console.log(todolist);

    // const handleFocus = (e) => {
    //     console.log(e.target.name);
    //     const {name} = e.target;        
    //     setTodolist(prev =>  ({...prev, [name]: ""})) 
    // }

    const isValidEmail = (email) => {
         const emailRegex = /^\S+@\S+\.\S+$/;
         return emailRegex.test(email);
    }

    const isValidPhoneNumber = (phonenumber) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phonenumber);
    }

    const validateform = () => {
        let newErrors = {};
        if (!todolist.namevalue) {
            newErrors.namevalue = "Name is required";
        }
        if(!todolist.emailvalue){
            newErrors.emailvalue = "Email is required";
        }else if (!isValidEmail(todolist.emailvalue)){
            newErrors.emailvalue = "Invalid email format";
        }
        if (!todolist.phonevalue) {
            newErrors.phonevalue = "Phone number is required";
        }else if (!isValidPhoneNumber(todolist.phonevalue)){
            newErrors.phonevalue = "Phone number must be 10 digits";
        }

        setError(prev => ({...prev, ...newErrors}));
        return Object.keys(newErrors).length === 0;
    };

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateform();
        if (!isValid) return;
        setStatus(true);
        try {
            const docRef = await addDoc(collection(db, "todolist"), {...todolist}); 
            if (docRef.id) {
                console.log("Success");
                setStatus(false);
                setTodolist({namevalue:"", emailvalue:"", phonevalue:""})
            }
        } catch (error) {
            console.log(error);
        }      
    }

    useEffect(() => {        
        if (!edit) {
            return;
        }   
        const edittodo = () => {
            return todolistData.filter(item => item.id === edit);          
        }
        const editedtodo = edittodo();
        const {namevalue, emailvalue, phonevalue} = editedtodo[0];
        setTodolist({namevalue, emailvalue, phonevalue});        
    }, [edit, todolistData])

    console.log(todolist);

    const updatetodo = async (e, edit) => {
        e.preventDefault();      
        setStatus(true);
        try {                
            const productRef = doc(db, "todolist", edit);
            await updateDoc(productRef, { ...todolist});

            setTodolist({
            ...todolist,
            namevalue: "",
            emailvalue: "",
            phonevalue:"",            
           })
           setEdit(null);
           setStatus(false);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <Form className='p-4 bg-dark mb-3' onSubmit={(e) => edit ? updatetodo(e, edit) : handleSubmit(e)} method='post'>
           <Row>
            <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="text" placeholder='Name' value={todolist.namevalue} name="namevalue" onChange={handleValue}/>
                    {error.namevalue && <div className='error'>{error.namevalue}</div>}
                </Form.Group>            
            </Col>
            <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="email" placeholder='Email' value={todolist.emailvalue} name="emailvalue" onChange={handleValue}/>
                    {error.emailvalue && <div className='error'>{error.emailvalue}</div>}
                </Form.Group>                
            </Col>
            <Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Control type="tel" placeholder='Phone Number' value={todolist.phonevalue} name="phonevalue" onChange={handleValue}/>
                    {error.phonevalue && <div className='error'>{error.phonevalue}</div>}
                </Form.Group>
            </Col>
            <Col>
            {
                edit ? (<FormButton type="submit" variant="success">update</FormButton>): (<FormButton type="submit">Add Details</FormButton>)
            }
            
                
            </Col>
           </Row>
        </Form>
        {
            status ? (<div className='loader position-fixed w-100 h-100'>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                </div>) : ""
        }
    </>
  )
}
