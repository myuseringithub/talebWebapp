export default (context) => {
    let path = context.request.url // get path
    let pathArray = path.split("/") // split path sections to an array.
    pathArray = pathArray.filter(String) // remove empty string.
    return pathArray
}