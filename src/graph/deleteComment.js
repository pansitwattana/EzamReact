export default (comments, mutationQuery) => {
  return new Promise((resolve, reject) => {
    let reqCount = 0
    const length = comments.length
    if (length === 0) {
      resolve()
    }
    comments.forEach(comment => {
      const variables = { id: comment.id }
      mutationQuery({ variables })
        .then(res => {
          reqCount++
          console.log(reqCount)
          if (reqCount === length) {
            resolve(res)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  })
}