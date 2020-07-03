import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { createSerializer } from "enzyme-to-json";
import sinon from 'sinon';

expect.addSnapshotSerializer(createSerializer({ mode: 'deep'}));

Enzyme.configure({adapter: new Adapter() });

//Make Enzyme functions available to all test files

global.React = React;
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.sinon = sinon;
