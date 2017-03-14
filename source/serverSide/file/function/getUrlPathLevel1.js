import getUrlPathAsArray from 'file/function/getUrlPathAsArray.js'

export default (context) => {
    let pathArray = getUrlPathAsArray(context)
    return pathArray[0]
}