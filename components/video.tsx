"use client"

interface VideoProps {
  src?: string
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  controls?: boolean
  alt?: string
  caption?: string
}

export function Video({ 
  src, 
  className = "", 
  autoPlay = true, 
  loop = true, 
  muted = true,
  controls = false,
  alt,
  caption
}: VideoProps) {
  // Use placeholder video if no src provided
  const videoSrc = src || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  
  return (
    <div className="relative my-6">
      <div className={`group relative w-full overflow-hidden bg-white dark:bg-[#0B0B09] border-t border-b border-black/8 dark:border-transparent md:border md:rounded-xl md:border-black/8 md:dark:border-transparent shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] dark:shadow-none ${className}`}>
        <video
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          controls={controls}
          className="w-full aspect-video"
          preload="metadata"
          aria-label={alt || "Video content"}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {!controls && (
          <button 
            aria-label="Toggle video playback" 
            className="absolute inset-0 h-full w-full cursor-pointer"
            onClick={(e) => {
              const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
              if (video) {
                if (video.paused) {
                  video.play();
                } else {
                  video.pause();
                }
              }
            }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white/90 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M5.75 3C4.7835 3 4 3.7835 4 4.75V19.25C4 20.2165 4.7835 21 5.75 21H8.25C9.2165 21 10 20.2165 10 19.25V4.75C10 3.7835 9.2165 3 8.25 3H5.75Z" fill="currentColor" />
                <path d="M15.75 3C14.7835 3 14 3.7835 14 4.75V19.25C14 20.2165 14.7835 21 15.75 21H18.25C19.2165 21 20 20.2165 20 19.25V4.75C20 3.7835 19.2165 3 18.25 3H15.75Z" fill="currentColor" />
              </svg>
            </div>
          </button>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-center text-sm text-black dark:text-white opacity-80">
          {caption}
        </p>
      )}
    </div>
  )
}
