import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(URL).then(response => {
    const TODO = response.data as Todo
    
    const id = TODO.id
    const title = TODO.title
    const completed = TODO.completed

    logToto(id, title, completed);
});

const logToto = (id: number, title: string, completed: boolean) => {
    console.log(`
    The TODO with ID: ${id}
    Has a title of: ${title}
    Its it completed: ${completed}
`);
};