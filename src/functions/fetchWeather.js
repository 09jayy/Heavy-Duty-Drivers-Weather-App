import axios from 'axios';

export const fetchWeather = async (city) =>  { 
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ca7fa4eea17f1ddca4179ea69c71470b`); 
        return response.data; 
    } catch (error) {
        console.error(error);
        return null; 
    }
}