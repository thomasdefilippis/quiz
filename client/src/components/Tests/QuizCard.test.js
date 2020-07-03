import QuizCard from '../QuizCard';
import { expectation } from 'sinon';

it("renders correctly", () => {
    const wrapper = shallow(    //shallow does not mount entire DOM but just gives a shallow version of it
        <QuizCard />
    );

    expect(wrapper).toMatchSnapshot();
});

it("renders correctly again", () => {
    const wrapper = render(  
        <QuizCard />
    );

    expect(wrapper).toMatchSnapshot();
})