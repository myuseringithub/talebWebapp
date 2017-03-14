import getUrlPathAsArray from 'file/function/getUrlPathAsArray.js'

export default (context) => {
    let pathArray = getUrlPathAsArray(context)
    if(pathArray[1] == null) {
        return false
    } else {
        return pathArray[1]
    }
}