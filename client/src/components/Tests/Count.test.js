import Count from '../api/Count';

it('returns the number of Questions', async () =>{

    const count = await Count();
    expect(count).toEqual(6)
})
