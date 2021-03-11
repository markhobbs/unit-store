/* Graph Component */
import moment from 'moment';
moment().format(); // console.log(moment.locale());

export default function Graph(props) {
  let plots =  props.data; // console.log(plots);
  let plotsReducer = plots.map(plot => { return [plot.value, plot.created] });
  return (
    <div className="graph">
        {/*<h1>{props.title}</h1>*/}
        <ul>
          {plotsReducer.map((plot, key) => (
              <li className={plot[0] < 0 ? "graph-item graph-item--negative" : "graph-item"} key={key} 
                  style={{
                    paddingLeft : '4px', 
                    opacity : 0.5, 
                    'width' : plot[0]+'px',
                    'border' : '1px solid white' 
                  }}>
                  <small 
                    style={{'position':'absolute'}}>
                    <span>{plot[0]} :: {moment(plot[1]).format('LLLL')}</span>
                  </small>
              </li>
          ))}
        </ul>
    </div>
  ) 
};

/*<p>{moment(plot[1], "YYYYMMDD").fromNow()}</p><p>{moment(plot[1]).format('LLLL')}</p><p>{moment(plot[1]).format('llll')}</p>*/
/*<canvas className="graph" style={{
    'border': '1px solid black',
    'background': 'white', 
    'height': 'auto',
    'minWidth': props.width, 
    'padding': '10px',
    'marginTop': '10px',
    'color':'black',
    'boxShadow': '2px 4px red'}>
    { plotValue }
    { plotCreated }
</canvas>*/
