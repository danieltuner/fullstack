const dummy = (blogs) => {
    return 1
  }
  
  const totalLikes = (bloglist) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return bloglist.reduce(reducer, 0)
}
const favoriteBlog = (bloglist) => {
    let favorite = bloglist[0]
    bloglist.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    delete favorite._id
    delete favorite._v
    return favorite
}
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }