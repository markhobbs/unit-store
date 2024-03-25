import React from 'react';
import moment from 'moment';
moment().format();

export default function Graph(props) {
  
  let plots =  props.data;
  let plotsReducer = plots.map(
    plot => { 
      return [
        plot.value, 
        plot.created
      ] 
  });

  return (
    <div className="graph">
    <ul>
      {plotsReducer.map((current, i) => (
          <li className={current[0] < 0 ? "graph-item graph-item--negative" : "graph-item"} 
              key={i} 
              style={{
                padding : '4px', 
                marginBottom : '4px',
                listStyle : 'none',  
                opacity : 0.5, 
                'width' : (current[0] * 0.5)+' px',
                'border' : '1px solid white',
              }}>
              <b>{current[0]}</b> : { moment(current[1]).format('LLLL') }
              {/*
                [LOC PREV: <b>{array[i-1] ? array[i-1][0] : ""}, {array[i-1] ? array[i-1][1] : ""}</b>] 
                [LOC DIFF: <b>{array[i-1] ? current[0] - array[i-1][0] : ""}, {array[i-1] ? current[1] - array[i-1][1] : ""}</b>]
                [TIME CURR <b>{array[i-1] ? moment(current[2]).format('HH:mm:ss A') : ""}</b>]
                [TIME PREV <b>{array[i-1] ? moment(array[i-1][2]).format('HH:mm:ss A') : ""}</b>]
                [TIME DIFF <b>{moment(current[2],'HH:mm:ss A').diff(array[i-1] ? moment(array[i-1][2]) : 0, 'days')} </b> days]
                [TIME DIFF <b>{moment(current[2],'HH:mm:ss A').diff(array[i-1] ? moment(array[i-1][2]) : 0, 'seconds')} </b> seconds]
                */}
          </li>))}
    </ul>
</div>
  );
}