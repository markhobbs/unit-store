/* 
    Heading
*/

export default function Heading(props) {
    let text =  props.text;
    let sup =  props.sup; 
    let inline =  props.inline === '' ? 'heading' : 'heading inline';
    return (
        <span>
            <h2 
                className={inline}>
                {text} 
            </h2>
            <sup> {sup} rec(s)</sup>
        </span>
    )
}
