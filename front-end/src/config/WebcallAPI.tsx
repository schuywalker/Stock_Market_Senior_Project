const backendBaseAddress = 'http://127.0.0.1:8080'

export function createUser(username:string,password:string,email:string,firstName:string,lastName:string){
    return backendBaseAddress+"/createUser?username="+username+"&password="+password+"&email="+email+"&first="+firstName+"&last="+lastName
}
export function login(username:string,password:string){//
    return backendBaseAddress+"/userLogin?username="+username+"&password="+password
}
export function deleteUser(username:string){
    return backendBaseAddress +"/deleteUser?user=" + username
}
export function getUserData(username:string){
    return backendBaseAddress+"/getUserData?user="+username
}
export function alterUsername(parameters:{[key:string]:string}){
    return backendBaseAddress+"/alterUsername?originalUser=" + parameters['originalUsername'] +"&user="+parameters['newValue']
}
export function alterUserFirstName(parameters:{[key:string]:string}){
    return backendBaseAddress+"/alterUserFirstName?user="+ parameters['username'] + "&firstName="+parameters['newValue']
}
export function alterUserLastName(parameters:{[key:string]:string}){
    return backendBaseAddress+"/alterUserLastName?user="+ parameters['username'] + "&lastName="+parameters['newValue']
}
export function alterUserEmail(parameters:{[key:string]:string}){
    return backendBaseAddress+"/alterUserEmail?user="+ parameters['username'] + "&email="+parameters['newValue']
}
export function isCorrectPassword(parameters:{[key:string]:string}){
    return backendBaseAddress+"/verifyPassword?user="+ parameters['username'] + "&password="+parameters['originalPassword']
}
export function alterPassword(parameters:{[key:string]:string}){
    return backendBaseAddress+"/alterPassword?user="+ parameters['username'] + "&password="+parameters['newPassword']
}