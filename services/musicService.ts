import { Song } from '@/data/constants';

export async function searchOnlineSongs(query: string): Promise<Song[]> {
    if (!query.trim()) return [];

    try {
        // We use the iTunes Search API to get high-quality metadata
        const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=30`);
        const data = await response.json();

        return data.results.map((item: any) => ({
            id: `online-${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            cover: item.artworkUrl100.replace('100x100', '600x600'), // Get higher res cover
            src: item.previewUrl, // Default to preview
            isOnline: true,
            youtubeSearch: `${item.trackName} ${item.artistName} lyrics`
        }));
    } catch (error) {
        console.error('Error searching online songs:', error);
        return [];
    }
}

export async function getTrendingSongs(): Promise<Song[]> {
    try {
        // iTunes RSS Top Songs (Vietnam)
        const response = await fetch('https://itunes.apple.com/vn/rss/topsongs/limit=50/json');
        const data = await response.json();

        if (!data.feed || !data.feed.entry) return [];

        return data.feed.entry.map((entry: any) => {
            const trackId = entry.id.attributes['im:id'];
            return {
                id: `trending-${trackId}`,
                title: entry['im:name'].label,
                artist: entry['im:artist'].label,
                // Replace 170x170 with 600x600 for high quality
                cover: entry['im:image'][2].label.replace(/\/\d+x\d+/, '/600x600'),
                src: entry.link[1].attributes.href, // Preview URL
                isOnline: true,
                youtubeSearch: `${entry['im:name'].label} ${entry['im:artist'].label} lyrics`
            };
        });
    } catch (error) {
        console.error('Error fetching trending songs:', error);
        return [];
    }
}
