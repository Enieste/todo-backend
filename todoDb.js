const Sequelize = require('sequelize');

const sequelize = new Sequelize('todos', 'todos_app', 'todopass', {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// Or you can simply use a connection uri
// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const Todo = sequelize.define ('todo', {
    text: Sequelize.TEXT
});

Todo.sync();

module.exports = {
    list() {return Todo.findAll();} ,
    add(todo) {
        return Todo.create({
            text: todo.text
        });
    },
    remove(id) {
        return Todo.destroy({where: {id: id}});
    },
    removeAll() {
        return Todo.destroy({truncate: true});
    }

};
