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
            const user1 = server.create('user', {firstName: 'John', lastName: 'Doe'});
            const user2 = server.create('user', {firstName: 'Isaac', lastName: 'Newton'});
            const user3 = server.create('user', {firstName: 'Alan', lastName: 'Turing'});

            server.create("post", { user: user1, content: "My first post!", date: new Date(2021, 0).toDateString() });
            server.create("post", { user: user2, content: "Bye!", date: new Date(2020, 11, 20).toDateString() });
            server.create("post", { user: user3, content: "Hello world!", date: new Date(2021, 0, 6).toDateString() });
        },
        
        routes() {
            this.namespace = 'mockApi';

            this.get('/posts', (schema) => {
                return schema.posts.all();
            });

            this.get('/users', (schema) => {
                return schema.users.all();
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
            })
        }
    })
}