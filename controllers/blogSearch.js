const _ = require("lodash");
const fetchBlogs = require("../utils/fetchBlogs");

module.exports = {
  get: async (req, res) => {
    try {
      const response = await fetchBlogs();
      const blogs = _.filter(response.blogs, blog => blog.title.toLowerCase().includes(req.query.query.toLowerCase()))
      const total = _.size(blogs);

      res.json({
        total: total,
        blogs: blogs
      })
    }
    catch (err) {
      res.json({ "message": "error" })
      console.log(err);
    }
  }
}
