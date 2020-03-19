const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((num, blog)=>{
        return num + blog.likes
    }, 0)
    return result
}


module.exports = {
    dummy,
    totalLikes
}