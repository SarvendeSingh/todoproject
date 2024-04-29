import { createContext, useReducer, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, doc, deleteDoc, getDocs } from 'firebase/firestore';

export const todoContext = createContext({
    todolistData: [],
    addTodo: () => {},
    deleteTodo: () => {}, 
})

const todolistReducer = (currenttodo, action) => {    
    let newtodo = currenttodo;
    if (action.type == "ADD") {
        newtodo = action.payload.todolist
    }    
    else if(action.type == "DELETE"){
        newtodo = currenttodo;        
    }
    return newtodo
}

export const TodoContext = ({children}) => {

    const [todolistData, dispatchTodolistData] = useReducer(todolistReducer, [])

    const addTodo = (todolist) => {
        dispatchTodolistData({ type: "ADD", payload: {todolist}})
    }


        const deleteTodo = async (todoid) => {
            try {
                if (!todoid) {
                    console.log("todoid is undefined");
                    return;
                }    
                await deleteDoc(doc(db, "todolist", todoid));
                dispatchTodolistData({
                    type: "DELETE",
                });
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        };
    


        useEffect(() => {
            try {
                const todolistdata = collection(db, "todolist");
                onSnapshot(todolistdata, (snapshot) => {
                    var todolistdoc = snapshot.docs.map((doc) =>
                        { return {id: doc.id, ...doc.data()}
                     });
                    
                    //console.log(todolistdoc);
                    addTodo(todolistdoc);  
                });  
            } catch (error) {
                console.log(error);
            }
        }, []);
        
        
        

    // console.log(todolistData);

  return (
    <todoContext.Provider value={{todolistData, addTodo, deleteTodo }}>{children}</todoContext.Provider>
  )
}

