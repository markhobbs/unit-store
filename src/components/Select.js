import React from 'react';

export default function Select(props) {
    return <select name="unit" id="unit" onChange={props.onchange}>
            <option value="">Default :: None</option>
            <option value="millimetres">Length :: Millimetre</option>
            <option value="centimetres">Length :: Centimetre</option>
            <option value="metres">Length :: Metres</option>
            <option value="kilometres">Length :: Kilometre</option>
            <option value="&#37;">Percentage ::  &#37;</option>
            <option value="&deg;">Temp :: &deg;</option>	
            <option value="&#8457;">Temp :: &#8457;</option>
            <option value="milliseconds">Time :: Millisecond</option>
            <option value="seconds">Time :: Second</option>
            <option value="minutes">Time :: Minute</option>
            <option value="hours">Time :: Hour</option>
        </select>
};
