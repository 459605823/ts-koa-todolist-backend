import Todo from '../models/todo';

export const getTodo = async () => {
  return new Promise((resolve, reject) => {
    Todo.find().exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const addTodo = async (data) => {
  return new Promise((resolve, reject) => {
    if (data.content) {
      Todo.create({
        content: data.content,
        completed: false,
        createTime: new Date(),
      })
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    }
  });
};

export const updateTodo = async (id, data) => {
  return new Promise((resolve, reject) => {
    Todo.findByIdAndUpdate(id, data).exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export const deleteTodo = async (id) => {
  return new Promise((resolve, reject) => {
    Todo.findByIdAndRemove(id).exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
