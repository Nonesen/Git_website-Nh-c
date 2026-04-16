import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { username, password } = await request.json();

        const user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 401 });
        }

        // We try both hashed and plain text (for initial migration check)
        // In a real app we would only use compare
        let isMatch = false;
        try {
            isMatch = await bcrypt.compare(password, user.password as string);
        } catch (e) {
            // If bcrypt fails (maybe it's plain text), do a direct comparison
            isMatch = password === user.password;
        }

        if (!isMatch) {
            return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({
            success: true,
            user: {
                username: user.username,
                name: user.name,
                role: user.role
            }
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
