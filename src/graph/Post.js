import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('https://api.graph.cool/simple/v1/cj951wqgw0iy40126c3pm1z8x', {
  headers: {
    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MDgzMTYyNDksImNsaWVudElkIjoiY2o4d3NqdHB6MGhlbzAxNDE2d3AyeXdzbyJ9.jrIdcEsm6Ip5OH8XIq8Q6GGDhKU8v3PRZK-5IMaaS0M',
  },
});


const queryPosts = client.request(`
{
  allPosts{
    title
    latex
  }
}
`)

export default queryPosts

// export default () => {
//   createPost: client.request(`
//       {
//         createPost(
//           title:"Calculus"
//           latex:"\\frac{5x+4}{5}=3x"
//           authorId:"cj95487of05ia0148kc103sp2"
//         ) {
//           id
//         }
//       }
//     `),
 
// }
