import { createSlice } from "@reduxjs/toolkit";

const initState = {
    todoList: [],
};
const todolistSlice = createSlice({
    name: "todolist",
    initialState: initState,
    reducers: {
        add_todo(state, action) {
            const newTodoList = state.todoList;
            if (!newTodoList.find((item) => item.id === 0)) {
                newTodoList.push(action.payload);
                state.todoList = newTodoList;
            }
        },
        update_todo(state, action) {
            const updatedTodo = action.payload;

            const newTodoList = state.todoList.map((item) => {
                if (item.id === updatedTodo.id) {
                    if (!item.id) {
                        const time = new Date();
                        const id = time.getTime();
                        updatedTodo.id = id;
                    }
                    console.log(updatedTodo);
                    return updatedTodo;
                } else {
                    return item;
                }
            });
            state.todoList = newTodoList;
        },
        delete_todo(state, action) {
            const deletedTodo = action.payload;
            const newTodoList = state.todoList.map((item) => {
                if (item.id == deletedTodo.id) {
                    const newItem = { ...item, deleted: true };
                    return newItem;
                } else return item;
            });
            state.todoList = newTodoList;
        },
        set_todoList(state, action) {
            console.log(action.payload);
            state.todoList = action.payload;
        },
        reset_todoList(state, action) {
            state = initState;
        },
    },
});
const selectTodoList = (state) => state.todoList.todoList;
export const { add_todo, update_todo, delete_todo, set_todoList, reset_todoList } = todolistSlice.actions;
export default todolistSlice.reducer;
export { selectTodoList };
