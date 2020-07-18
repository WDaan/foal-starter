<template>
    <div>
        <div class="box">
            <h1>To-Do List</h1>
            <div v-if="todos.length">
                <div class="row" v-for="todo in todos" :key="todo.id">
                    <div class="text">{{ todo.text }}</div>
                    <div class="checkbox-wrapper">
                        <input
                            type="checkbox"
                            v-on:click="deleteTodo(todo, $event)"
                        />
                    </div>
                </div>
            </div>
            <div class="row">
                <input
                    type="text"
                    class="text-input"
                    v-on:keyup.enter="addNewTodo"
                    v-model="newTodoText"
                    placeholder="Type a new to-do and press Enter"
                />
            </div>
        </div>

        <div class="form-group error text-center" v-if="error">
            {{ error }}
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    name: 'Home',
    data: () => ({
        todos: [],
        error: null,
        newTodoText: ''
    }),

    computed: {
        ...mapGetters(['get_request_headers']),
        header() {
            return this.get_request_headers()
        }
    },

    methods: {
        deleteTodo(todo) {
            axios.delete('/api/todos/' + todo.id, this.header)
            this.fetchTodos()
        },
        async addNewTodo() {
            if (!this.newTodoText) return
            await axios.post(
                '/api/todos',
                {
                    text: this.newTodoText
                },
                this.header
            )

            this.newTodoText = ''
            this.fetchTodos()
        },
        async fetchTodos() {
            const { data } = await axios.get('/api/todos', this.header)
            this.todos = data
        }
    },

    mounted() {
        this.fetchTodos()
    }
}
</script>

<style></style>
