import React from 'react';
import PropTypes from 'prop-types';
import './TimeTableView.css';
/*
 * INPUT: props.courses parsed as below
 * [{"week_day": 0, "start_time": 660, "end_time": 750, "course_name": "NAME OF EACH COURSE", "color": "#FFFFFF"}, {}, ...]
 * week_day is 0~5 integer. Monday is 0, Tuesday is 1, ... Saturday is 5
 * start_time, end_time are 660~1230 integer. This value is hour*60+minute (8:00~20:30). start_time must be divided by 30
 * color is 6 hexadigit number.
 * height is constant value, and width is max width percent value
*/


const TimeTableView = (props) => {
  const tableHeaderString = ['', 'M', 'T', 'W', 'T', 'F', 'S'];
  const coursesList = [[], [], [], [], [], []];
  const tablehtml = [];
  let tablehtmlIth = [];
  const heightunit = props.height;
  const widthunit = '14%';
  for (let i = 0; i < 26; i += 1) {
    for (let j = 0; j < 6; j += 1) {
      coursesList[j].push([]);
    }
  }
  for (let i = 0; i < props.courses.length; i += 1) {
    coursesList[props.courses[i].week_day][props.courses[i].start_time / 30 - 16].push(
      {
        name: props.courses[i].course_name,
        length: props.courses[i].end_time - props.courses[i].start_time,
        color: props.courses[i].color,
      },
    );
  }
  for (let i = 0; i < 7; i += 1) {
    tablehtmlIth.push(<th key={i} height={heightunit} width={widthunit}>{tableHeaderString[i]}</th>);
  }
  tablehtml.push(<tr key={-1}>{tablehtmlIth}</tr>);
  for (let i = 0; i < 26; i += 1) {
    tablehtmlIth = [];
    if (i % 2 === 0) {
      tablehtmlIth.push(
        <td
          key={1000 * i + 1000}
          height={2 * heightunit}
          width={widthunit}
          rowSpan={2}
        >
          {`${i / 2 + 8}:00`}
        </td>,
      );
    }
    for (let j = 0; j < 6; j += 1) {
      if (coursesList[j][i].length === 0) {
        tablehtmlIth.push(<td key={1000 * i + j + 1001} height={heightunit} width={widthunit} />);
      } else {
        tablehtmlIth.push(
          <td key={1000 * i + j} height={heightunit} width={widthunit}>
            {
              coursesList[j][i].map(
                (course) => (
                  <div
                    className="square"
                    key={1}
                    style={
                    {
                      height: `${((heightunit * course.length) / 30) * 1.1}px`,
                      width: `${14 * props.width / 100}%`,
                      backgroundColor: course.color,
                    }
                  }
                  >
                    {course.name}
                  </div>
                ),
              )
            }
          </td>,
        );
      }
    }
    tablehtml.push(<tr key={-i - 2}>{tablehtmlIth}</tr>);
  }
  return (
    <div className="Timetableview">
      <table id="timetable" border="1" bordercolor="black" style={{ alignItem: 'center', width: '100%' }}>
        <caption>TIMETABLE</caption>
        <tbody>
          {tablehtml}
        </tbody>
      </table>
    </div>
  );
};

TimeTableView.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      start_time: PropTypes.number.isRequired,
      end_time: PropTypes.number.isRequired,
      week_day: PropTypes.number.isRequired,
      course_name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};
export default TimeTableView;
