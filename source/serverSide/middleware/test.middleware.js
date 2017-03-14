async function test(context, next) {
    context.body = "Middleware 'test.js' was used."
    await next()
}

export default () => {
    return test
}