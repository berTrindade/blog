"use client";

import { useState, useRef } from "react";

interface ClipPathButtonProps {
  readonly variant?: "share" | "delete" | "confirm" | "mute";
  readonly size?: "sm" | "md" | "lg";
  readonly onComplete?: () => void;
  readonly holdDuration?: number;
}

interface IconProps {
  readonly className?: string;
}

const variants = {
  share: {
    bgColor: "bg-blue-500/10",
    overlayColor: "bg-blue-500",
    iconColor: "fill-blue-500",
  },
  delete: {
    bgColor: "bg-red-500/10",
    overlayColor: "bg-red-500",
    iconColor: "fill-red-500",
  },
  confirm: {
    bgColor: "bg-green-500/10",
    overlayColor: "bg-green-500",
    iconColor: "fill-green-500",
  },
  mute: {
    bgColor: "bg-orange-500/10",
    overlayColor: "bg-orange-500",
    iconColor: "fill-orange-500",
  },
};

const sizes = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
};

const iconSizes = {
  sm: "size-6",
  md: "size-10",
  lg: "size-12",
};

// Share icon (arrow pointing up from box)
function ShareIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Share Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C12.5523 2 13 2.44772 13 3V12.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L7.29289 11.7071C6.90237 11.3166 6.90237 10.6834 7.29289 10.2929C7.68342 9.90237 8.31658 9.90237 8.70711 10.2929L11 12.5858V3C11 2.44772 11.4477 2 12 2ZM4 14C4.55228 14 5 14.4477 5 15V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V15C19 14.4477 19.4477 14 20 14C20.5523 14 21 14.4477 21 15V19C21 20.6569 19.6569 22 18 22H6C4.34315 22 3 20.6569 3 19V15C3 14.4477 3.44772 14 4 14Z"
      />
    </svg>
  );
}

// Share complete icon (checkmark in circle)
function ShareCompleteIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Share Complete Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM16.7071 9.70711C17.0976 9.31658 17.0976 8.68342 16.7071 8.29289C16.3166 7.90237 15.6834 7.90237 15.2929 8.29289L10.5 13.0858L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L9.79289 15.2071C10.1834 15.5976 10.8166 15.5976 11.2071 15.2071L16.7071 9.70711Z"
      />
    </svg>
  );
}

// Delete icons
function TrashIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Trash icon"
      className={className}
      fill="none"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M7.22919 5H3.5C2.94772 5 2.5 5.44772 2.5 6C2.5 6.55228 2.94772 7 3.5 7H4.03211L4.80971 18.2752C4.95435 20.3726 6.6979 22 8.80023 22H15.1998C17.3021 22 19.0456 20.3726 19.1903 18.2752L19.9679 7H20.5C21.0523 7 21.5 6.55228 21.5 6C21.5 5.44772 21.0523 5 20.5 5H16.7708C16.1335 2.97145 14.2395 1.5 12 1.5C9.76053 1.5 7.86655 2.97145 7.22919 5ZM9.40105 5H14.599C14.0801 4.10329 13.1099 3.5 12 3.5C10.8901 3.5 9.9199 4.10329 9.40105 5ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}

function TrashConfirmIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Trash icon"
      className={className}
      fill="none"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M12 1.5C14.2394 1.5 16.1331 2.9715 16.7705 5H20.5C21.0523 5 21.5 5.44772 21.5 6C21.5 6.55228 21.0523 7 20.5 7H19.9678L19.1904 18.2754C19.0457 20.3725 17.3023 21.9998 15.2002 22H8.7998C6.69772 21.9998 4.95429 20.3725 4.80957 18.2754L4.03223 7H3.5C2.94772 7 2.5 6.55228 2.5 6C2.5 5.44772 2.94772 5 3.5 5H7.22949C7.86688 2.9715 9.76056 1.5 12 1.5ZM10.6309 10.2246C10.2381 9.90426 9.65908 9.92685 9.29297 10.293C8.92685 10.6591 8.90426 11.2381 9.22461 11.6309L9.29297 11.707L10.5859 13L9.29297 14.293C8.90244 14.6835 8.90244 15.3165 9.29297 15.707C9.68349 16.0976 10.3165 16.0976 10.707 15.707L12 14.4141L13.293 15.707L13.3691 15.7754C13.7619 16.0957 14.3409 16.0731 14.707 15.707C15.0731 15.3409 15.0957 14.7619 14.7754 14.3691L14.707 14.293L13.4141 13L14.707 11.707L14.7754 11.6309C15.0957 11.2381 15.0731 10.6591 14.707 10.293C14.3409 9.92685 13.7619 9.90426 13.3691 10.2246L13.293 10.293L12 11.5859L10.707 10.293L10.6309 10.2246ZM12 3.5C10.8902 3.5 9.92023 4.10337 9.40137 5H14.5986C14.0798 4.10337 13.1098 3.5 12 3.5Z"
        fillRule="evenodd"
        fill="currentColor"
      />
    </svg>
  );
}

// Confirm icons
function ConfirmIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Confirm Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12ZM8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071C8.68342 12.0976 9.31658 12.0976 9.70711 11.7071L11 10.4142V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V10.4142L14.2929 11.7071C14.6834 12.0976 15.3166 12.0976 15.7071 11.7071C16.0976 11.3166 16.0976 10.6834 15.7071 10.2929L12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L8.29289 10.2929Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

function ConfirmCompleteIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Confirm Complete Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM13.7071 8.29289C13.3166 7.90237 12.6834 7.90237 12.2929 8.29289C11.9024 8.68342 11.9024 9.31658 12.2929 9.70711L13.5858 11H8C7.44772 11 7 11.4477 7 12C7 12.5523 7.44772 13 8 13H13.5858L12.2929 14.2929C11.9024 14.6834 11.9024 15.3166 12.2929 15.7071C12.6834 16.0976 13.3166 16.0976 13.7071 15.7071L16.7071 12.7071C17.0976 12.3166 17.0976 11.6834 16.7071 11.2929L13.7071 8.29289Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

// Mute icons
function NotificationIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Notification Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C7.7922 2 4.14828 5.17264 3.70001 9.35647L3.00652 14.0627C2.7396 15.8741 4.1435 17.5 5.97447 17.5H18.0255C19.8565 17.5 21.2604 15.8741 20.9935 14.0627L20.3 9.35648C19.8517 5.17264 16.2078 2 12 2Z" />
      <path d="M16.5839 19H7.41602C8.18758 20.7659 9.94966 22 12 22C14.0503 22 15.8124 20.7659 16.5839 19Z" />
    </svg>
  );
}

function NotificationMutedIcon({ className }: IconProps) {
  return (
    <svg
      aria-label="Notification Silent Icon"
      className={className}
      fill="currentColor"
      height="24"
      role="graphics-symbol"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.70711 2.29289C3.31658 1.90237 2.68342 1.90237 2.29289 2.29289C1.90237 2.68342 1.90237 3.31658 2.29289 3.70711L4.74909 6.1633C4.19205 7.1199 3.82372 8.19952 3.69976 9.35647L3.00628 14.0627C2.73936 15.8741 4.14325 17.5 5.97423 17.5H16.0858L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L3.70711 2.29289Z" />
      <path d="M20.9932 14.0627C21.1646 15.2258 20.6471 16.3124 19.77 16.9413L6.70991 3.88115C8.16578 2.70204 10.0204 2 11.9997 2C16.2075 2 19.8515 5.17264 20.2998 9.35648L20.9932 14.0627Z" />
      <path d="M7.41578 19C8.18733 20.7659 9.94941 22 11.9997 22C14.0501 22 15.8121 20.7659 16.5837 19H7.41578Z" />
    </svg>
  );
}

const iconComponents = {
  share: { default: ShareIcon, complete: ShareCompleteIcon },
  delete: { default: TrashIcon, complete: TrashConfirmIcon },
  confirm: { default: ConfirmIcon, complete: ConfirmCompleteIcon },
  mute: { default: NotificationIcon, complete: NotificationMutedIcon },
};

function ClipPathButton({
  variant = "share",
  size = "md",
  onComplete,
  holdDuration = 1000,
}: ClipPathButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const holdTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { bgColor, overlayColor, iconColor } = variants[variant];
  const sizeClass = sizes[size];
  const iconSizeClass = iconSizes[size];

  const DefaultIcon = iconComponents[variant].default;
  const CompleteIcon = iconComponents[variant].complete;

  const handlePointerDown = () => {
    setIsHolding(true);
    setIsComplete(false);

    holdTimeoutRef.current = setTimeout(() => {
      setIsComplete(true);
      onComplete?.();
      
      // Reset after showing complete state
      resetTimeoutRef.current = setTimeout(() => {
        setIsHolding(false);
        setIsComplete(false);
      }, 500);
    }, holdDuration);
  };

  const handlePointerRelease = () => {
    if (!isComplete) {
      setIsHolding(false);
      if (holdTimeoutRef.current) {
        clearTimeout(holdTimeoutRef.current);
      }
    }
  };

  const getLabel = () => {
    switch (variant) {
      case "share":
        return "Share";
      case "delete":
        return "Delete Item";
      case "confirm":
        return "Confirm";
      case "mute":
        return "Mute notifications";
    }
  };

  return (
    <button
      aria-label={getLabel()}
      className={`relative flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-full ${bgColor} ${sizeClass} will-change-transform transition-transform duration-150 active:scale-95`}
      type="button"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerRelease}
      onPointerLeave={handlePointerRelease}
      onPointerCancel={handlePointerRelease}
    >
      {/* Overlay that reveals on hold */}
      <div
        aria-hidden="true"
        className={`absolute flex shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-full ${overlayColor} ${sizeClass} will-change-[clip-path]`}
        style={{
          clipPath: isHolding ? "inset(0px)" : "inset(100% 0px 0px)",
          transitionProperty: "clip-path",
          transitionDuration: isHolding ? `${holdDuration}ms` : "300ms",
          transitionTimingFunction: isHolding ? "linear" : "ease-out",
        }}
      >
        <CompleteIcon
          className={`${iconSizeClass} select-none fill-white will-change-transform`}
        />
      </div>

      {/* Default icon */}
      <DefaultIcon className={`${iconSizeClass} select-none ${iconColor}`} />
    </button>
  );
}

// Demo component showing all button variants
export function ClipPathButtonDemo() {
  return (
    <div className="flex flex-col gap-8 py-8 sm:flex-row sm:py-16 items-center justify-center">
      <ClipPathButton
        variant="share"
        onComplete={() => console.log("Share complete!")}
      />
      <ClipPathButton
        variant="confirm"
        onComplete={() => console.log("Confirmed!")}
      />
      <ClipPathButton
        variant="delete"
        onComplete={() => console.log("Deleted!")}
      />
      <ClipPathButton
        variant="mute"
        onComplete={() => console.log("Muted!")}
      />
    </div>
  );
}
