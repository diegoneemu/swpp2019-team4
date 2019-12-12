import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { getMockStore } from '../../../test-utils/mocks';
import RecommendResult from './RecommendResult';

const stubState = {
  user: { is_authenticated: true },
  recommended_timetables: [],
};

jest.mock('../../../components/TimetableView/TimetableView', () => jest.fn((props) => (
  <div>
    {props.courses.map((x) => <button id="fake-course" type="button" key={1}>{x.course_id}</button>)}
  </div>
)));

function timetableRecommend(state) {
  const mockStore = getMockStore(state);
  const recommendlist = [
    {
      id: 1,
      course: [
        {
          time: [
            {
              week_day: 0,
              start_time: 660,
              end_time: 750,
            },
            {
              week_day: 2,
              start_time: 1020,
              end_time: 1110,
            },
            {
              week_day: 3,
              start_time: 1110,
              end_time: 1230,
            },
          ],
          name: '자료구조',
          color: '#2BC366',
          course_number: 'M1522.000900',
          lecture_number: '001',
        },
      ],
    },
  ];
  return (
    <Provider store={mockStore}>
      <ConnectedRouter history={createBrowserHistory()}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <RecommendResult
                timetable={recommendlist}
                closePopup={() => 1}
              />
            )}
          />
          <Route path="/login" exact render={() => <div className="Login" />} />
          <Route path="/main" exact render={() => <div className="Main" />} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

describe('RecommendResult test', () => {
  beforeEach(() => {
    // TimetableView.mockClear();
  });

  afterEach(() => jest.clearAllMocks());

  it('should render timetableRecommend', () => {
    const component = mount(timetableRecommend(stubState));
  });
});
