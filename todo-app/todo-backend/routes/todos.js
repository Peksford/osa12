const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { setAsync } = require('../redis/index');
const { getAsync } = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  let get_todos = await getAsync('added_todos');
  get_todos++;
  await setAsync('added_todos', get_todos);
  console.log('Count of todos', get_todos);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  console.log('Request of one todo', req.todo);
  res.send(req.todo); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;
  console.log('update body', req.todo);
  await Todo.findByIdAndUpdate(req.todo._id, body);
  res.sendStatus(200).end(); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
