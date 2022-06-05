const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  jest.setTimeout(1000000);

  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);
  test(`there are ${helper.initialBlogs.length} notes`, async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  }, 100000);
  test('the first blog is about React patterns', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map((r) => r.title);
    expect(titles).toContain('React patterns');
  }, 100000);
});

describe('viewing a specific blog', () => {
  test('a specific note can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb();

    const blogToView = blogsAtStart[0];

    const resultNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
    expect(resultNote.body).toEqual(processedBlogToView);
  }, 100000);
  test('Unique identifier to be defined _id', async () => {
    const blogs = await helper.blogsInDb();
    console.log(blogs);
    // eslint-disable-next-line no-underscore-dangle
    expect(blogs[0]._id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'qkh',
      url: 'https://reactpatterns.com/',
      likes: 17,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map((r) => r.title);

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    expect(titles).toContain(
      'async/await simplifies making async calls',
    );
  }, 100000);

  test('add default blog like eq 0', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'qkh',
      url: 'https://reactpatterns.com/',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const blogInDb = blogsAtEnd.find((r) => r.title === newBlog.title);
    console.log('blogInDb', blogInDb);
    expect(blogInDb.likes).toBe(0);
  }, 100000);

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'qkh',
      url: 'https://reactpatterns.com/',
      likes: 7,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  }, 100000);
});

describe('deletion of a blog', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204);

    const notesAtEnd = await helper.blogsInDb();

    expect(notesAtEnd).toHaveLength(
      helper.initialBlogs.length - 1,
    );

    const titles = notesAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  }, 100000);
});

afterAll(() => {
  mongoose.connection.close();
});
