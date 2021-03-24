
/*
    Select Component
    TODO :: Populate from Json
*/ 

export default function Select(props) {
    return <select name="unit" id="unit" onChange={props.onchange}>
            <option value="">-------------- Choose Unit --------------</option>
            <option value="%">Percentage(%)</option>
            <option>-------------- Area --------------</option>
            <option value="mm2">Millimetre square(mm2)</option>
            <option value="cm2">Centimetre square(cm2)</option>
            <option value="in2">Square inch(in2)</option>
            <option value="ft2">Square foot(ft2)</option>	
            <option value="yd2">Square yard(yd2)</option>
            <option value="m2">Square metre(m2)</option>
            <option value="ac">Acre(ac)</option>
            <option value="h2">Hectare Square</option>
            <option value="km2">Kilometre(km2)</option>	
            <option value="mi2">Square mile(mi2)</option>
            <option>-------------- Length --------------</option>           
            <option value="mm">Millimetre(mm)</option>
            <option value="cm">Centi-metre(cm)</option>
            <option value="in">Inch(in)</option>
            <option value="ft">Feet(ft)</option>
            <option value="yd">Yard(yd)</option>
            <option value="m">Metre(m)</option>
            <option value="km">Kilo-metre(km)	</option>
            <option value="mi">Mile(mi)</option>
            <option value="">-------------- Temp --------------</option>
            <option value="℃">Degree Celsius ℃	</option>
            <option value="℉ ">Degree Fahrenheit ℉</option>	
            <option value="k">Kelvin(K)</option>
            <option>-------------- Time --------------</option>
            <option value="ms">Milli-second</option>
            <option value="s">Seconds(s)</option>
            <option value="m">Minutes	</option>
            <option value="h">Hours	</option>
            <option value="d">Days	</option>
            <option value="w">Weeks	</option>
            <option value="m">Month</option>	
            <option value="y">Year</option>	
            <option value="d">Decade	</option>
            <option value="c">Century</option>
            <option>-------------- Speed --------------</option>
            <option value="ftm">Foot/minute (ft/min)</option>	
            <option value="mtm">Metre/minute (m/min)</option>	
            <option value="kmh">Kilometre/hour (km/h)	</option>
            <option value="fts">Foot/second (ft/s)</option>	
            <option value="mph">Miles/hour (mi/h)	</option>
            <option value="knots">Knots</option>
            <option value="mts">Metre/second (m/s)</option>
            <option>-------------- Volume --------------</option>
            <option value="ml">Milli-leter(ml)</option>
            <option value="l">Litre(l) </option>  
            <option value="gal">gallons(gal)</option>
            <option value="m3">cubic metre(m3)</option>
            <option>-------------- Weight --------------</option>
            <option value="mg">Milligram(mg) </option>
            <option value="g">Grams(g)</option>
            <option value="oz">Ounces(oz)</option>
            <option value="lb">Pounds(lb)</option>
            <option value="kg">Kilograms(kg)</option>
            <option value="st">Stone(st)</option>
            <option value="t">Tonne(t)</option>
            <option>-------------- Currency --------------</option>
            <option value="$">Dollar $</option>
            <option value="£">Pound £</option>
            <option value="€">Euro €</option>
            <option value="¥">Yen ¥</option>
            <option value="₹">Indian Rupee ₹</option>
            <option value="₽">Ruble ₽</option>
            <option value="元">Yuan 元</option>
        </select>
};
