const Question = async(index) =>{
    try{
        const response = await fetch(`http://localhost:5000/${index}`);
        const json = await response.json();
        const array = Object.values(json[0])
        const finalArray = [];
        finalArray.push(array[1],array.slice(2,6), array[6]);
        return finalArray;
    }catch(err){
        console.error(err.message);
    }
}


export default Question;