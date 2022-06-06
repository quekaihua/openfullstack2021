const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { body, user } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id,
  });

  const savedBlog = await blog.save();
  // eslint-disable-next-line no-underscore-dangle
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.json(savedBlog);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const blog = {
    title: body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
  };
  console.log(blog);

  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

  response.json(newBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findByIdAndRemove(request.params.id);
  if (blog.user.toString() !== user.id) {
    return response.status(401).json({
      error: 'permision denied',
    });
  }
  return response.status(204).end();
});

module.exports = blogsRouter;
