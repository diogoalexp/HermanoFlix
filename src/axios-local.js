import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://react-my-burger-diogoalexp.firebaseio.com/'
    baseURL: 'http://localhost:3000/static/media/subtitles.cf799271.vtt'
});

export default instance;