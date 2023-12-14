function validPhone(phone) {
    const regexp = new RegExp(/(\+7|8)?\d{10}/)
    return regexp.test(phone) ? true : false

}
function validName(name) {
    const regexp = new RegExp(/^[a-zа-яё]{2,50}$/, 'i')
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
function createErrorComponent(text) {
    let error = document.createElement('div');
    error.innerHTML = text;
    error.classList.add('error');
    return error
}
function ErrorControl(container, error) {
    container.append(error)
    setTimeout(() => {
        error.remove()
    }, 5000)
}
function createHistoryComponent(date, browser) {
    let history = document.createElement('li');
    history.classList.add('entry-history-list_item')
    let date_view = document.createElement('p');
    date_view.classList.add('entry-history-list_item_time')
    date_view.innerHTML = date;
    let browser_view = document.createElement('p');
    browser_view.classList.add('entry-history-list_item_browser')
    browser_view.innerHTML = browser;
    history.append(date_view, browser_view)
    return history
}
function historyControl(container, history_info) {
    for (let history of history_info) {
        history = history.split(';')
        container.append(createHistoryComponent(`${history[0].split('-').reverse().join('.')} ${history[1]}`, history[2]))
    }
}

export {validPhone, validName, getBrowserType, createErrorComponent, ErrorControl, historyControl}