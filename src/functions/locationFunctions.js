import { fetchWeather } from "./fetchWeather";

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

export const addLocation = async (newLocation, setLocations, setError) => {
    try {
        const data = await fetchWeather(newLocation);
        setLocations((prev) => [...prev, data]); 
    } catch (error) {
        if (error.response) {
            const statusCode = error.response.status;

            if (statusCode === 404) {
            setError('City not recognized. Please check the city name and try again.');
            } else if (statusCode === 500) {
            setError('Internal Server Error. Please try again later.');
            } else {
            setError(`An unexpected error occurred. Status code: ${statusCode}`);
            }
        } else if (error.request) {
            setError('No response from the server. Please check your network connection.');
        } else {
            setError('Error in request setup: ' + error.message);
        } 
        console.error('Error:', error.message);
    }
}

export const deleteLocation = (deleteLocation, setLocations) => {
    setLocations((prev) => prev.filter((_,index) => index !== deleteLocation)); 
}

export const moveForward = (index, setLocations) => {
    setLocations((prev) => moveIndexInArray(prev,index, index+1)); 
}

export const moveBackward = (index, setLocations) => {
    setLocations((prev) => moveIndexInArray(prev,index, index-1)); 
}