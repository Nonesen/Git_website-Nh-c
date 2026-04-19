export let loginLogs = JSON.parse(localStorage.getItem('sonify_login_logs')) || [];
export let totalVisitors = parseInt(localStorage.getItem('sonify_visitor_count')) || 0;
export let totalListens = parseInt(localStorage.getItem('sonify_listen_count')) || 0;

export function recordVisit() {
    if (!sessionStorage.getItem('sonify_visit_tracked')) {
        totalVisitors++;
        localStorage.setItem('sonify_visitor_count', totalVisitors);
        sessionStorage.setItem('sonify_visit_tracked', 'true');
    }
}

export function recordListen(statTotalListens) {
    totalListens++;
    localStorage.setItem('sonify_listen_count', totalListens);
    if (statTotalListens) statTotalListens.textContent = totalListens.toLocaleString();
}

export async function recordLoginLog(username) {
    let location = "Unknown";
    try {
        const resp = await fetch('https://ipapi.co/json/');
        const data = await resp.json();
        location = `${data.city}, ${data.country_name}`;
    } catch (e) {
        location = "Vị trí không xác định";
    }

    const newLog = {
        user: username,
        time: new Date().toLocaleString('vi-VN'),
        location: location,
        device: getDeviceFromUA()
    };
    
    loginLogs.unshift(newLog);
    if (loginLogs.length > 50) loginLogs.pop();
    localStorage.setItem('sonify_login_logs', JSON.stringify(loginLogs));
}

function getDeviceFromUA() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile Device";
    if (/tablet/i.test(ua)) return "Tablet Device";
    return "Desktop / PC";
}
