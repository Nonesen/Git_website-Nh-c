export function renderAdminMusic(musicTbody, songs) {
    if (!musicTbody) return;
    musicTbody.innerHTML = '';
    songs.forEach(song => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>#${song.id}</td>
            <td><img src="${song.cover}" alt=""></td>
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>
                <div class="admin-actions">
                    <button class="btn-action" title="Sửa"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-action delete" title="Xóa"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        musicTbody.appendChild(tr);
    });
}

export function renderAdminUsers(userTbody, users) {
    if (!userTbody) return;
    userTbody.innerHTML = '';
    users.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.username}</td>
            <td>${u.name}</td>
            <td>${u.email || 'N/A'}</td>
            <td><span class="role-badge" style="background: ${u.role === 'admin' ? '#f59e0b' : 'var(--primary-color)'}; font-size: 0.6rem;">${u.role}</span></td>
            <td>
                <div class="admin-actions">
                    <button class="btn-action" title="Chỉnh sửa"><i class="fa-solid fa-user-pen"></i></button>
                    <button class="btn-action delete" title="Khóa"><i class="fa-solid fa-ban"></i></button>
                </div>
            </td>
        `;
        userTbody.appendChild(tr);
    });
}

export function renderAdminLogs(logsTbody, loginLogs) {
    if (!logsTbody) return;
    logsTbody.innerHTML = '';
    loginLogs.forEach(log => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${log.user}</strong></td>
            <td>${log.time}</td>
            <td>${log.location}</td>
            <td><i class="fa-solid fa-desktop"></i> ${log.device}</td>
        `;
        logsTbody.appendChild(tr);
    });
}
