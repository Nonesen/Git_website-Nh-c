import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export async function GET() {
    try {
        await dbConnect();
        const feedbacks = await Feedback.find({}).sort({ timestamp: -1 });
        return NextResponse.json({ success: true, data: feedbacks });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const feedback = await Feedback.create(body);
        return NextResponse.json({ success: true, data: feedback });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE() {
    try {
        await dbConnect();
        // Danger: Clears all feedback. In production check admin token first.
        await Feedback.deleteMany({});
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
