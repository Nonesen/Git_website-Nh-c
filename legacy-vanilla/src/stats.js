export let loginLogs = JSON.parse(localStorage.getItem('vibraze_login_logs')) || [];
export let totalVisitors = parseInt(localStorage.getItem('vibraze_visitor_count')) || 0;
export let totalListens = parseInt(localStorage.getItem('vibraze_listen_count')) || 0;

export function recordVisit() {
    if (!sessionStorage.getItem('vibraze_visit_tracked')) {
        totalVisitors++;
        localStorage.setItem('vibraze_visitor_count', totalVisitors);
        sessionStorage.setItem('vibraze_visit_tracked', 'true');
    }
}

export function recordListen(statTotalListens) {
    totalListens++;
    localStorage.setItem('vibraze_listen_count', totalListens);
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
    localStorage.setItem('vibraze_login_logs', JSON.stringify(loginLogs));
}

function getDeviceFromUA() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "Mobile Device";
    if (/tablet/i.test(ua)) return "Tablet Device";
    return "Desktop / PC";
}
