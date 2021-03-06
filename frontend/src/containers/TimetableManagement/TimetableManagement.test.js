import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { getMockStore } from '../../test-utils/mocks';
import TimetableManagement from './TimetableManagement';

import * as actionCreators from '../../store/actions/user';

const stubState = {
  user: {
    is_authenticated: true,
    timetable_main: 1,
  },
  timetables: [
    {
      id: 1,
      title: 'my timetable',
    },
  ],
  courses: [{
    id: 0,
    title: '자료구조',
    color: '#2BC366',
    course_number: 'M1522.000900',
    lecture_number: '001',
    time: [{
      week_day: 0,
      start_time: 660,
      end_time: 750,
    }],
  }],
  timetable: {
    title: '',
    course: [{
      id: 0,
      title: '자료구조',
      color: '#2BC366',
      course_number: 'M1522.000900',
      lecture_number: '001',
      time: [{
        week_day: 0,
        start_time: 660,
        end_time: 750,
      }],
    }],
  },
  buildingList: [],
};
const stubStateFalse = {
  user: {
    is_authenticated: false,
    timetable_main: 0,
  },
  timetables: [],
  courses: [],
  timetable: {
    title: '',
    courses: [],
  },
};
function timetableManagement(state) {
  const mockStore = getMockStore(state);
  return (
    <Provider store={mockStore}>
      <ConnectedRouter history={createBrowserHistory()}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <TimetableManagement courses={[]} height={24} width={80} text link title="" />}
          />
          <Route path="/login" exact render={() => <div className="Login" />} />
          <Route path="/main" exact render={() => <div className="Main" />} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

jest.mock('../../components/SearchBar/SearchBar', () => jest.fn((props) => (
  <div className="SearchBar">
    <input
      type="text"
      placeholder="과목명"
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
    <button type="button" onClick={props.onSearch}> Search </button>
  </div>
)));

jest.mock('../CourseDetail/CourseDetail', () => jest.fn(() => (
  <div className="CourseDetail" />
)));

describe('TimetableManagement test', () => {
  let spyGetUser;
  let spyGetSignout;
  let spyGetTimetables;
  let spySetCourses;
  let spyGetTimetable;
  let spyPostTimetable;
  let spyPostCourse;
  let spyPostMainTimetable;
  let spyDeleteTimetable;
  beforeEach(() => {
    spyGetUser = jest.spyOn(actionCreators, 'getUser')
      .mockImplementation(() => () => Promise.resolve(null));
    spyGetSignout = jest.spyOn(actionCreators, 'getSignout')
      .mockImplementation(() => () => {});
    spyGetTimetables = jest.spyOn(actionCreators, 'getTimetables')
      .mockImplementation(() => () => {});
    spySetCourses = jest.spyOn(actionCreators, 'setCourses')
      .mockImplementation(() => () => {});
    spyGetTimetable = jest.spyOn(actionCreators, 'getTimetable')
      .mockImplementation(() => () => {});
    spyPostTimetable = jest.spyOn(actionCreators, 'postTimetable')
      .mockImplementation(() => () => Promise.resolve(null));
    spyPostCourse = jest.spyOn(actionCreators, 'postCourse')
      .mockImplementation(() => () => {});
    spyPostMainTimetable = jest.spyOn(actionCreators, 'postMainTimetable')
      .mockImplementation(() => () => {});
    spyDeleteTimetable = jest.spyOn(actionCreators, 'deleteTimetable')
      .mockImplementation(() => () => {});
    // TimetableRecommend.mockClear();
  });

  afterEach(() => jest.clearAllMocks());

  it('should call componentDidMount', () => {
    mount(timetableManagement(stubState));
    expect(spyGetUser).toBeCalledTimes(1);
    expect(spyGetTimetables).toBeCalledTimes(1);
  });

  it('should render timetableManagement', () => {
    const component = mount(timetableManagement(stubState));
    expect(component.find('#topbar').length).toBe(1);
    expect(component.find('#logout-button').length).toBe(1);
    expect(component.find('#semester-select').length).toBe(1);
    expect(component.find('#timetable-table').length).toBe(1);
    expect(component.find('#create-button').length).toBe(1);
  });

  it('should call postTimetable when pressed create-button', () => {
    const component = mount(timetableManagement(stubState));
    component.find('#create-button').simulate('click');
    expect(spyPostTimetable).toBeCalledTimes(1);
  });

  it('should call post when pressed postCourse button', () => {
    const component = mount(timetableManagement(stubState));
    component.find('#searched-tab').find('button').simulate('click');
    expect(spyPostCourse).toBeCalledTimes(1);
  });

  it('should call show when pressed createTimetable button', () => {
    const component = mount(timetableManagement(stubState));
    component.find('#timetable-list').find('button').at(0).simulate('click');
    expect(spyGetTimetable).toBeCalledTimes(1);
    expect(spyPostMainTimetable).toBeCalledTimes(1);
  });

  it('should call signout when pressed logout button', () => {
    const component = mount(timetableManagement(stubState));
    component.find('#logout-button').simulate('click');
    expect(spyGetSignout).toBeCalledTimes(1);
  });

  it('should call search when pressed search button', () => {
    const component = mount(timetableManagement(stubState));
    expect(spySetCourses).toBeCalledTimes(1);
    component.find('.SearchBar button').simulate('click');
    expect(spySetCourses).toBeCalledTimes(2);
  });

  it('should change value when typing in search', () => {
    const component = mount(timetableManagement(stubState));
    component.find('.SearchBar input').simulate('change', 'asdf');
  });
  it('should redirect to login when is_authenticated is false', () => {
    const component = mount(timetableManagement(stubStateFalse));
    expect(component.find('.Login').length).toBe(1);
  });

  it('should call deleteTimetable when pressed [X] button', () => {
    const component = mount(timetableManagement(stubState));
    component.find('#timetable-list').find('.delete-button').simulate('click');
    expect(spyDeleteTimetable).toBeCalledTimes(1);
  });
});
