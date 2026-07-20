import React, { useMemo } from 'react';

const toEmbedUrl = (url) => {
  if (!url) return '';
  try {
    // If url doesn't start with protocol, try adding https://
    let candidate = url;
    if (!/^https?:\/\//i.test(candidate)) {
      candidate = `https://${candidate}`;
    }

    // Handle YouTube watch URLs and short links
    const u = new URL(candidate);
    const hostname = u.hostname.replace('www.', '');

    if (hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
      // If it's already an embed path, return it
      if (u.pathname.includes('/embed/')) return candidate;
    }

    if (hostname === 'youtu.be') {
      const id = u.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // If url contains watch?v= but was relative, extract manually
    const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
    if (watchMatch && watchMatch[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    // If already an embed url or other provider, return the candidate
    return candidate;
  } catch (e) {
    // Last resort: try to extract v= param directly from original string
    const watchMatch = url.match(/[?&]v=([A-Za-z0-9_-]{6,})/);
    if (watchMatch && watchMatch[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    return url;
  }
};

const VideoPlayer = ({ videoUrl, title }) => {
  const embedUrl = useMemo(() => toEmbedUrl(videoUrl), [videoUrl]);

  return (
    <div className="w-full">
      <div className="relative w-full h-0 pb-[56.25%] bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-900 rounded-3xl overflow-hidden shadow-2xl group">
        {embedUrl ? (
          <iframe
            key={embedUrl}
            src={embedUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full rounded-3xl pointer-events-auto"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-900">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 5v10l8-5-8-5z"/>
                </svg>
              </div>
              <p className="text-secondary-600 dark:text-secondary-400 text-lg font-medium">Video not available</p>
              <p className="text-secondary-500 dark:text-secondary-500 text-sm mt-2">Please check back later</p>
            </div>
          </div>
        )}
        {/* Enhanced overlay effect (non-blocking) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
      </div>
    </div>
  );
};

export default VideoPlayer;

