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
export function alterUsername(originalUsername:string){
    return backendBaseAddress+"/alterUsername?originalUser=" + originalUsername +"&user="
}
export function alterUserFirstName(username:string){
    return backendBaseAddress+"/alterUserFirstName?user="+ username + "&firstName="
}
export function alterUserLastName(username:string){
    return backendBaseAddress+"/alterUserLastName?user="+ username + "&lastName="
}
export function alterUserEmail(username:string){
    return backendBaseAddress+"/alterUserEmail?user="+ username + "&email="
}
