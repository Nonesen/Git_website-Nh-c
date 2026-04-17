import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find({}, '-password'); // Don't return passwords
        return NextResponse.json({ success: true, data: users });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
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
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
