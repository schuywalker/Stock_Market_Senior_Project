const backendBaseAddress = 'http://127.0.0.1:8080'

//////////// LOGIN CALLS ////////////

export function createUser(username: string, password: string, email: string, firstName: string, lastName: string) {
    return backendBaseAddress + '/createUser?username=' + username + '&password=' + password + '&email=' + email + '&first=' + firstName + '&last=' + lastName
}
export function login(username: string, password: string) {
    //
    return backendBaseAddress + '/userLogin?username=' + username + '&password=' + password
}
export function deleteUser(username: string) {
    return backendBaseAddress + '/deleteUser?user=' + username
}
export function getUserData(username: string) {
    return backendBaseAddress + '/getUserData?user=' + username
}
export function alterUsername(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/alterUsername?originalUser=' + parameters['originalUsername'] + '&user=' + parameters['newValue']
}
export function alterUserFirstName(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/alterUserFirstName?user=' + parameters['username'] + '&firstName=' + parameters['newValue']
}
export function alterUserLastName(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/alterUserLastName?user=' + parameters['username'] + '&lastName=' + parameters['newValue']
}
export function alterUserEmail(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/alterUserEmail?user=' + parameters['username'] + '&email=' + parameters['newValue']
}
export function isCorrectPassword(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/verifyPassword?user=' + parameters['username'] + '&password=' + parameters['originalPassword']
}
export function alterPassword(parameters: {[key: string]: string}) {
    return backendBaseAddress + '/alterPassword?user=' + parameters['username'] + '&password=' + parameters['newPassword']
}

//////////// WATCHLIST CALLS ////////////

// tickersToDelete should be a list
export function delTickersFromWL(tickersToDelete: String, wl_id: number, user_id: string) {
    return `${backendBaseAddress}/deleteTickersFromWatchlist?wl_id=${wl_id}&user_id=${user_id}&returnWL=True&tickers=${tickersToDelete}`
}

// tickersToAdd should be a list??
export function addTickersToWL(tickersToAdd: String, wl_id: number, user_id: string) {
    return `${backendBaseAddress}/addTickersToWatchlist?wl_id=${wl_id}&user_id=${user_id}&returnWL=True&tickers=${tickersToAdd}`
}

export function createWL(user_id: string, wl_name: string) {
    return `${backendBaseAddress}/createWatchlist?user_id=${user_id}&wl_name=${wl_name}`
}

export function deleteWL(wl_id: number, user_id: string) {
    return `${backendBaseAddress}/deleteWatchlist?wl_id=${wl_id}&user_id=${user_id}`
}

export function getUserWL(user_id: string) {
    return `${backendBaseAddress}/getUserWatchlists?user_id=${user_id}`
}

export function getWL(wl_id: number, user_id: string) {
    return `${backendBaseAddress}/getWatchlist?wl_id=${wl_id}&user_id=${user_id}`
}

export function renameWL(wl_id: number, user_id: string, wl_name: string) {
    return `${backendBaseAddress}/renameWatchlist?user_id=${user_id}&wl_id=${wl_id}&new_name=${wl_name}`
}

export function getWLAssets(user_id: string, wl_id: number) {
    return `${backendBaseAddress}/populateWatchlist?user_id=${user_id}&wl_id=${wl_id}`
}

//////////// INSIDER TRADES CALLS ////////////
export function testMethod(pageNumber?:number){
    return backendBaseAddress+"/testInsider"+(pageNumber?"?page="+pageNumber:"")
}
