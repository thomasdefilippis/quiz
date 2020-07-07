
import QuizCard from '../QuizCard';
import Question from '../api/Question'


beforeAll(() => {
    global.fetch = jest.fn();`+`
});

let wrapper;
~+
beforeEach (() =>{
    wrapper = shallow(<QuizCard />, { disableLifecycleMethods: true });
});

afterEach(() => {
    wrapper.unmount();
});



it("must render a loading span before api call success", () => {
    expect(wrapper.find("span.spinner").exists).toBeTruthy();
});




