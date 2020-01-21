import { observable, action, computed } from 'mobx';

// Define todo interface
export interface ItodoType {
    id: string,
    title: string,
    completed: boolean
}

class todostore {

    @observable todos = [
        {
            id: 'sadunhdsh',
            title: 'Take Out Trash',
            completed: false
        },
        {
            id: 'iokpopeas',
            title: 'Cook Dinner',
            completed: false
        },
        {
            id: 'uipdaepola',
            title: 'Eat Lunch',
            completed: false
        },
    ]

    @computed get todoCount() {
        return this.todos.length
    }

    @action
    addTodo(todo: ItodoType): void {
        this.todos.push(todo);
    }

    @action
    deleteTodo(todoId: string): void {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
    }

    @action
    toggleCompleted(todoId: string): void {
        this.todos = this.todos.map(todo => {
            if (todo.id === todoId) {
                console.log('Hello');

                return {
                    ...todo,
                    completed: !todo.completed
                }
            }

            return todo;
        })
    }
}

export const todoStore = new todostore();