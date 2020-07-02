

const Count = async() =>{
    try{
        const response = await fetch("http://localhost:5000/");
        const Object = await response.json();
        const count = parseInt(Object[0].count);
        return count;
    }catch(err){
        console.error(err.message);
    }
}

export default Count;