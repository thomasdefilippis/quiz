import Question from '../api/Question';

it('grabs initial Question data', async () =>{
    const array = await Question(1);
    expect(array).toEqual([
            "What is the Capitol of Washington?",["Denver","Olympia","Seattle","Spokane"],"Olympia"
        ]
            );
}
)