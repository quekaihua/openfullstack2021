const _ = require('lodash');

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const total = blogs.reduce((pre, blog) => pre + blog.likes, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((pre, blog) => {
    let most = pre;
    if (Object.keys(pre).length === 0
        || pre.likes < blog.likes) {
      most = blog;
    }
    return most;
  }, {});
  return favorite;
};

const mostBlogs1 = (blogs) => {
  const res = _.groupBy(blogs, (blog) => blog.author);
  return res;
};

const mostBlogs = (blogs) => {
  const m = new Map();
  blogs.forEach((blog) => {
    if (m.has(blog.author)) {
      const pre = m.get(blog.author);
      m.set(blog.author, pre + 1);
    } else {
      m.set(blog.author, 1);
    }
  });

  let most;
  m.forEach((value, key) => {
    if (!most || most.blogs < value) {
      most = { author: key, blogs: value };
    }
  });
  return most;
};

const mostLikes = (blogs) => {
  const m = new Map();
  blogs.forEach((blog) => {
    if (m.has(blog.author)) {
      const pre = m.get(blog.author);
      m.set(blog.author, pre + blog.likes);
    } else {
      m.set(blog.author, blog.likes);
    }
  });

  let most;
  m.forEach((value, key) => {
    if (!most || most.likes < value) {
      most = { author: key, likes: value };
    }
  });
  return most;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostBlogs1,
  mostLikes,
};
