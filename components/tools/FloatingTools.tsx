"use client"
export default function FloatingTools() {
    return (
        <button className="fixed right-0 top-0 bg-red-500 bg-opacity-50" onClick={() => localStorage.removeItem('token')}>Delete token</button>
    )
}