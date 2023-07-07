import { createSlice, current } from "@reduxjs/toolkit";

const initState = {
    todoList: [],
};
const todolistSlice = createSlice({
    name: "todolist",
    initialState: initState,
    reducers: {
        add_todo(state, action) {
            const newTodoList = state.todoList;
            newTodoList.push(action.payload);
            state.todoList = newTodoList;
        },
        update_todo(state, action) {
            const updatedTodo = action.payload;
            const newTodoList = state.todoList.map((item) => {
                if (item.id === updatedTodo.id) {
                    return updatedTodo;
                } else {
                    return item;
                }
            });
            state.todoList = newTodoList;
        },
        delete_todo(state, action) {
            const deletedTodo = action.payload;
            const newTodoList = state.todoList.filter((item) => {
                return item.id !== deletedTodo.id;
            });
            state.todoList = newTodoList;
        },
        set_todoList(state, action) {
            console.log(action.payload);
            state.todoList = action.payload;
        },
    },
});
const selectToDoList = (state) => state.todoList.todoList;
export const { add_todo, update_todo, delete_todo, set_todoList } = todolistSlice.actions;
export default todolistSlice.reducer;
export { selectToDoList };
