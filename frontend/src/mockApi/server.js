import { belongsTo, createServer, hasMany, Model, RestSerializer } from 'miragejs';

export default function makeServer() {
    createServer({
        models: {
            post: Model.extend({
                user: belongsTo()
            }),
            user: Model.extend({
                posts: hasMany()
            })
        },

        serializers: {
            application: RestSerializer
        },

        seeds(server) {
            const user1 = server.create('user', {firstName: 'John', lastName: 'Doe', email: 'jdoe@example.com', password: 'password1'});
            const user2 = server.create('user', {firstName: 'Isaac', lastName: 'Newton', email: 'inewton@example.com', password: 'password2'});
            const user3 = server.create('user', {firstName: 'Alan', lastName: 'Turing', email: 'aturing@example.com', password: 'password3'});

            server.create("post", { user: user1, content: "My first post!", date: new Date(2021, 0).toDateString() });
            server.create("post", { user: user2, content: "Bye!", date: new Date(2020, 11, 20).toDateString() });
            server.create("post", { user: user3, content: "Hello world!", date: new Date(2021, 0, 6).toDateString() });
        },
        
        routes() {
            this.namespace = 'mockApi';

            this.delete('/posts/:id', (schema, request) => {
                const id = request.params.id;
                schema.posts.find(id).destroy();
                return {id};
            });

            this.get('/posts', (schema) => {
                return schema.posts.all();
            });

            this.post('/posts', (schema, request) => {
                const postData = JSON.parse(request.requestBody);
                postData.date = new Date().toDateString();
                const result = schema.create("post", postData);
                return result;
            });

            this.put('/posts/:id', (schema, request) => {
                const postData = JSON.parse(request.requestBody);
                const id = request.params.id;
                const result = schema.posts.find(id).update('content', postData.content);
                return result;
            });

            this.get('/users', (schema) => {
                const users = schema.users.all();
                users.models.forEach(user => {
                    delete user.attrs.email;
                    delete user.attrs.password;
                });
                return users;
            });

            this.post('/users', (schema, request) => {
                const userData = JSON.parse(request.requestBody);
                const result = schema.create("user", userData);
                delete result.attrs.email;
                delete result.attrs.password;
                return result;
            });
        }
    })
}