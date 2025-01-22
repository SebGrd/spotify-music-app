export async function transferPlayback(deviceId: string, play: boolean) {
    const signal = new AbortController().signal;
    try {
        const res = await fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                device_ids: [deviceId],
                play
            }),
            signal
        })
        if (!res.ok) {
            throw new Error('Failed to transfer playback');
        }
        return;
    } catch (error) {
        console.error(error);
    }
}