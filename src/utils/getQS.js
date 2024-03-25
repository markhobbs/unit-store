/* getQS.js */
let search = window.location.search;
let params = new URLSearchParams(search);
let station = params.get('station') || '';

const getQS = () => {
    return station;
};

export default getQS;