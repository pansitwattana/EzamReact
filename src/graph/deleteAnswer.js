export default (answers, mutationQuery) => {
  return new Promise((resolve, reject) => {
    let reqCount = 0
    const length = answers.length
    if (length === 0) {
      resolve()
    }
    answers.forEach(answer => {
      const variables = { id: answer.id }
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