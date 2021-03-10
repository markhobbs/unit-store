/* 
    QS Reader
    TODO :: Replace with more resiliant method
    Not a reliable anchor
*/

let search = window.location.search;
let params = new URLSearchParams(search);
let hasStation = params.get('station') || '';

const getQS = () => {
    return hasStation;
};

export default getQS;
