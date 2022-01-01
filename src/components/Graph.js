/* Graph Component */
import moment from 'moment';
moment().format(); // console.log(moment.locale());

export default function Graph(props) {
  let plots =  props.data;  // console.log(plots);
  let plotsReducer = plots.map(plot => { return [plot.value, plot.value2, plot.created] });

  return (
    <div className="graph">
        <h3>{props.title}</h3>
        <ul>
          {plotsReducer.map((current, i, array) => (
              <li className={current[0] < 0 ? "graph-item graph-item--negative" : "graph-item"} key={i} 
                  style={{
                    padding : '4px', 
                    marginBottom : '4px',
                    listStyle : 'none',  
                    opacity : 0.5, 
                    'width' : (current[0] * 0.5)+' px',
                    'border' : '1px solid white',
                  }}>
                  <small 
                    //</li>style={{'position':'absolute'}}
                    >
                    <div>
                      <b>{current[0]}, {current[1]}, {moment(current[2]).format('LLLL')}</b>
                    </div>
                    <div>
                      [LOC PREV: <b>{array[i-1] ? array[i-1][0] : ""}, {array[i-1] ? array[i-1][1] : ""}</b>] 
                      [LOC DIFF: <b>{array[i-1] ? current[0] - array[i-1][0] : ""}, {array[i-1] ? current[1] - array[i-1][1] : ""}</b>]
                    </div>
                    <div>
                      [TIME CURR <b>{array[i-1] ? moment(current[2]).format('HH:mm:ss A') : ""}</b>]
                      [TIME PREV <b>{array[i-1] ? moment(array[i-1][2]).format('HH:mm:ss A') : ""}</b>]
                      [TIME DIFF <b>
                        {
                          moment(current[2],'HH:mm:ss A')
                          //moment('12:10:12: PM', 'HH:mm:ss: A')
                          .diff(array[i-1] ? moment(array[i-1][2]) : 0, 'days')
                        } </b> days]
                        [TIME DIFF <b>
                        {
                          moment(current[2],'HH:mm:ss A')
                          //moment('12:10:12: PM', 'HH:mm:ss: A')
                          .diff(array[i-1] ? moment(array[i-1][2]) : 0, 'seconds')
                        } </b> seconds]

                    </div>

                  </small>
              </li>
          ))}
        </ul>
    </div>
  ) 
};
