function validPhone(phone) {
    const regexp = new RegExp(/(\+7|8)?\d{10}/)
    return regexp.test(phone) ? true : false

}
function validName(name) {
    const regexp = new RegExp(/^[a-zа-я]{2,50}$/i)
    return regexp.test(name) ? true : false
}
function getBrowserType() {
    const test = regexp => {
      return regexp.test(navigator.userAgent);
    };
  
    if (test(/opr\//i) || !!window.opr) {
      return 'Opera';
    } else if (test(/edg/i)) {
      return 'Microsoft Edge';
    } else if (test(/chrome|chromium|crios/i)) {
      return 'Google Chrome';
    } else if (test(/firefox|fxios/i)) {
      return 'Mozilla Firefox';
    } else if (test(/safari/i)) {
      return 'Apple Safari';
    } else if (test(/trident/i)) {
      return 'Microsoft Internet Explorer';
    } else if (test(/ucbrowser/i)) {
      return 'UC Browser';
    } else if (test(/samsungbrowser/i)) {
      return 'Samsung Browser';
    } else {
      return 'Unknown browser';
    }
}
  
export {validPhone, validName, getBrowserType}