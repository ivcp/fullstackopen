const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((a, blog) => a + blog.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {};
  }

  const mostLikes = Math.max(...blogs.map(blog => blog.likes));
  const blogWithMostLikes = blogs.find(blog => blog.likes === mostLikes);
  const { title, author, likes } = blogWithMostLikes;

  return {
    title,
    author,
    likes,
  };
};

//TODO: 4.6
// const mostBlogs = blogs => {
//   if (blogs.length === 0) {
//     return {};
//   }
//
//   return {
//     // author,
//     // blogs,
//   };
// };

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
