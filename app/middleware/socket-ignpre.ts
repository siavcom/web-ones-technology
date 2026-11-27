export default defineEventHandler((event) => {
  console.log('socke io url=', event.node.req.url)
  if (event.node.req.url?.startsWith('/socket.io')) {

    event.node.res.statusCode = 204
    event.node.res.end()
  }
})
