import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Song from '@/models/Song';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        
        // Try deleting by customId first, then by _id
        const result = await Song.findOneAndDelete({ customId: id });
        
        if (!result) {
            // If not found by customId, try by MongoDB ObjectID
            await Song.findByIdAndDelete(id);
        }

        return NextResponse.json({ success: true, message: 'Song deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 400 });
    }
}
