/**
 * Function to move an element at one index to another
 * @param {Array} arr 
 * @param {number} oldIndex 
 * @param {number} newIndex 
 */
export const moveIndexInArray = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
        var k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
}