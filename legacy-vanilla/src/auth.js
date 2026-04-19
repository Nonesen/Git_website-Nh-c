import { recordLoginLog } from './stats.js';

export let currentUser = null;
export let currentRole = 'user';
export let users = JSON.parse(localStorage.getItem('sonify_users')) || [];

export function setUsers(newUsers) {
    users = newUsers;
}

export function handleLogin(uVal, pVal, callback) {
    const user = users.find(u => u.username === uVal && u.password === pVal);
    if (user) {
        recordLoginLog(user.username);
        callback(user);
        return true;
    }
    return false;
}

export function handleSignup(name, email, phone, user, pass) {
    if (users.find(u => u.username === user)) return { success: false, message: "Username đã tồn tại!" };
    
    const newUser = { 
        username: user, 
        password: pass, 
        name: name, 
        email: email, 
        phone: phone, 
        role: 'user' 
    };
    users.push(newUser);
    localStorage.setItem('sonify_users', JSON.stringify(users));
    return { success: true };
}

export function setCurrentUser(user) {
    currentUser = user;
    currentRole = user.role;
}
