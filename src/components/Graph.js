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
                    paddingLeft : '4px', 
                    opacity : 0.5, 
                    'width' : (current[0] * 0.5)+' px',
                    'border' : '1px solid white',
                    'paddingRight' : '4px',
                    'overflow': 'hidden'
                  }}>
                  <small 
                    //</li>style={{'position':'absolute'}}
                    >
                    <div>
                      {current[0]}, 
                      {current[1]},
                      {moment(current[2]).format('LLLL')}
                    </div>
                    <div>
                      Move Prev ::
                      {array[i-1] ? array[i-1][0] : ""}, 
                      {array[i-1] ? array[i-1][1] : ""}  :
                      Move Diff ::
                      {array[i-1] ? current[0] - array[i-1][0] : ""}, 
                      {array[i-1] ? current[1] - array[i-1][1] : ""}
                    </div>
                    <div>
                      Time Prev ::
                      {array[i-1] ? moment(array[i-1][2]).format('LLLL') : ""}
                      
                    </div>

                  </small>
              </li>
          ))}
        </ul>
    </div>
  ) 
};
