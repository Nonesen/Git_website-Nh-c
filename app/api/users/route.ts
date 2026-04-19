import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({}, '-password'); // Don't return passwords
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
    }
}

export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { username, likedSongs, playlists } = body;

        if (!username) {
            return NextResponse.json({ success: false, error: 'Username is required' }, { status: 400 });
        }

        const user = await User.findOneAndUpdate(
            { username },
            { likedSongs, playlists },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
    }
}

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const url = new URL(request.url);
        const username = url.searchParams.get('username');
        
        if (!username) {
            return NextResponse.json({ success: false, error: 'Thiếu tên đăng nhập' }, { status: 400 });
        }

        const userToDelete = await User.findOne({ username });
        if (!userToDelete) {
            return NextResponse.json({ success: false, error: 'Không tìm thấy người dùng' }, { status: 404 });
        }

        if (userToDelete.role === 'admin') {
            return NextResponse.json({ success: false, error: 'Không thể xóa tài khoản Quản trị viên' }, { status: 403 });
        }

        await User.deleteOne({ username });
        return NextResponse.json({ success: true, message: 'Đã xóa tài khoản' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Lỗi hệ thống' }, { status: 500 });
    }
}
