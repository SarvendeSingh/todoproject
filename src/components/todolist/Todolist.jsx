import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { todoContext } from '../../store/TodoContext';
import "./Todolist.css";

export const Todolist = ({setEdit}) => {
    const { todolistData, deleteTodo } = useContext(todoContext);
    
    const updateTodo = (id) => {       
        setEdit(id);
    }



    return (
        <div className='bg-secondary text-white'>
            {todolistData.length > 0 ? (
                todolistData.map((data) => (
                    <Row key={data.id}>
                        <Col md={3}>{data.namevalue}</Col>
                        <Col md={3}>{data.emailvalue}</Col>
                        <Col md={2}>{data.phonevalue}</Col>
                        <Col md={2}>
                          <button type="button" className="btn btn-danger" onClick={() => updateTodo(data.id)}>Edit</button>
                        </Col>
                        <Col md={2}>
                            <button type="button" className="btn btn-danger" onClick={() =>deleteTodo(data.id)}>Delete</button>
                        </Col>
                    </Row>
                ))
            ) : "No data available"}
        </div>
    );
};
