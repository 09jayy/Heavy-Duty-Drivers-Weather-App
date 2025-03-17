/**
 * Function to move an element at one index to another
 * @param {Array} arr 
 * @param {number} oldIndex 
 * @param {number} newIndex 
 */
export const moveIndexInArray = (arr, oldIndex, newIndex) => {
    if (newIndex < 0 || newIndex >= arr.length) return [...arr];

    const newArr = [...arr]; 
    const [movedItem] = newArr.splice(oldIndex, 1);

    newArr.splice(newIndex, 0, movedItem); 

    return newArr;
}