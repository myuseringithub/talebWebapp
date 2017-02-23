// example of async & await:
// const fs = require('fs-promise')
// app.use(async function (ctx, next) {
//   const paths = await fs.readdir('docs')
//   const files = await Promise.all(paths.map(path => fs.readFile(`docs/${path}`, 'utf8')))
//   ctx.type = 'markdown'
//   ctx.body = files.join('')
// })


// app.use(async (ctx, next) => {
//   try {
//     await next(); // next is now a function
//   } catch (err) {
//     ctx.body = { message: err.message };
//     ctx.status = err.status || 500;
//   }
// });
// app.use(async ctx => {
//   const user = await User.getById(ctx.session.userid); // await instead of yield
//   ctx.body = user; // ctx instead of this
// });

// serverKoa.use(async (context, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${context.method} ${context.originalUrl} ${context.status} - ${ms}ms`)
// })

// serverKoa.use(async (context, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   context.set('X-Response-Time', `${ms}ms`)
// })

// Error handling:
serverKoa.on('error', (error, context) =>
  log.error('server error', error, context)
)
