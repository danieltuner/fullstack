const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (bloglist) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return bloglist.reduce(reducer, 0)
}
  module.exports = {
    dummy, totalLikes
  }