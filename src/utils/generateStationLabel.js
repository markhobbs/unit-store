/* 
    labelGenerator
*/
const generateStationLabel =  (max,min) => {
    var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
    var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    //console.log(randPassword)
    return randPassword;
    
};

export default generateStationLabel;