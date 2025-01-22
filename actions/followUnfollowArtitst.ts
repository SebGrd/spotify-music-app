export async function followUnfollowArtist(id: string, type: 'follow' | 'unfollow') {
    const queryParams = new URLSearchParams({ type: 'artist', ids: id }).toString();
    const res = await fetch(`https://api.spotify.com/v1/me/following?${queryParams}`, {
        method: type === 'follow' ? 'PUT' : 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    if (!res.ok) {
        throw new Error("Following error");
    }
}