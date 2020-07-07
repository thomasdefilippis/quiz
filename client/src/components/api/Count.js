import axios from 'axios';

const Count = async() =>{
    try{
        const response = await axios("http://localhost:5000/count");
        const data = response.data;
        const count = parseInt(data[0].count);
        return count;
    }catch(err){
        console.error(err.message);
    }
}

export default Count;