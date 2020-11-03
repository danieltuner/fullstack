const lodash = require('lodash')

const dummy = (bloglist) => {
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

const mostBlogs = (bloglist) => {
  // Using lodash
  const groupedByAuthor = lodash.groupBy(bloglist, blog => blog.author)
  const authorlist = []
  lodash.forEach(groupedByAuthor, (authorBlogs, author) => {
      authorlist.push({
          author: author,
          bloglist: authorBlogs.length
      })
  })
  const sortedAuthorList = lodash.sortBy(authorlist, author => author.bloglist)
  // Take the last object (with highest amount of blogs)
  return sortedAuthorList.pop()
}

const mostLikes = (bloglist) => {
  const groupedByAuthor = lodash.groupBy(bloglist, blog => blog.author)
  const authorList = []
  lodash.forEach(groupedByAuthor, (authorBlogs, author) => {
      authorList.push({
          author: author,
          likes: totalLikes(authorBlogs)
      })
  })

  const sortedAuthorList = lodash.sortBy(authorList, author => author.likes)
  return sortedAuthorList.pop()
}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }