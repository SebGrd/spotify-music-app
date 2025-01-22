export default function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    window.location.replace('/');
}