/* generateStationLabel.js */
const generateStationLabel =  (max,min) => {
    var labelChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    var randLabel = Array(randPwLen).fill(labelChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randLabel;   
};

export default generateStationLabel;