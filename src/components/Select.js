/* Select */

import React from 'react';
import units from '../jsons/units.json'

export default function Select(props) {
    return (
        <select name="unit" id="unit" onChange={props.onChange}>
            {units.map(unit => (
                <option key={unit.value} value={unit.value}>
                    {unit.label}
                </option>
            ))}
        </select>
    );
};
