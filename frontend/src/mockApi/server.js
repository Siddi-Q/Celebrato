import { createServer, Model, RestSerializer } from 'miragejs';

export default function makeServer() {
    createServer({
        models: {
            post: Model,
            user: Model
        },

        serializers: {
            application: RestSerializer
        },

        seeds(server) {
            server.create("post", {content:"My first post!", user: '1', date: new Date(2021, 0).toDateString()})
            server.create("post", {content:"Hello world!", user: '3', date: new Date(2020, 11, 20).toDateString()})
            server.create("post", {content:"Bye!", user: '2', date: new Date(2021, 0, 6).toDateString()})

            server.create("user", {name: 'John Doe'})
            server.create("user", {name: 'Isaac Newton'})
            server.create("user", {name: 'Alan Turing'})
        },
        
        routes() {
            this.namespace = 'mockApi';

            this.get('/posts', (schema) => {
                return schema.posts.all()
            });

            this.get('/users', (schema) => {
                return schema.users.all()
            });
        }
    })
}