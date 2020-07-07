import Title from '../Title';
import { expectation } from 'sinon';

it("renders correctly", () => {
    const wrapper = shallow(    //shallow does not mount entire DOM but just gives a shallow version of it
        <Title />
    );

    expect(wrapper).toMatchSnapshot();
});

it("renders correctly again", () => {
    const wrapper = render(  
        <Title />
    );

    expect(wrapper).toMatchSnapshot();
});