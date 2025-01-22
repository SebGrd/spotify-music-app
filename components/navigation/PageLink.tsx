import Link from "next/link";

type PageLinkProps = {
    children: React.ReactNode;
    type: 'album' | 'playlist' | 'artist';
    id: string;
    className?: string;
}

export default function PageLink({ children, type, id, className, ...delegated }: PageLinkProps) {
    switch (type) {
        case 'album':
            return <Link href={`/webplayer/albums/${id}`} className={className} {...delegated}>{children}</Link>
        case 'playlist':
            return <Link href={`/webplayer/playlists/${id}`} className={className} {...delegated}>{children}</Link>
        case 'artist':
            return <Link href={`/webplayer/artists/${id}`} className={className} {...delegated}>{children}</Link>
        default:
            return <>{children}</>
    }
}