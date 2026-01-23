import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Easing,
} from "remotion";

// Theme colors matching the blog's design system
const COLORS = {
  bg: "#1e1e1e",
  text: "#d4d4d4",
  keyword: "#569cd6",
  string: "#ce9178",
  number: "#b5cea8",
  function: "#dcdcaa",
  comment: "#6a9955",
  type: "#4ec9b0",
  variable: "#9cdcfe",
  punctuation: "#d4d4d4",
  lineNumber: "#858585",
  added: "rgba(46, 160, 67, 0.15)",
  removed: "rgba(248, 81, 73, 0.15)",
};

export type CodeMorphProps = {
  codeVersions: string[];
  transitionDuration?: number; // frames for each transition
  holdDuration?: number; // frames to hold each version
};

// Simple syntax highlighter for TypeScript/JavaScript
const highlightCode = (code: string): React.ReactNode[] => {
  const tokens: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  const patterns: [RegExp, string][] = [
    [/^\/\/.*/, "comment"],
    [/^(const|let|var|function|return|if|else|for|while|import|export|from|type|interface|async|await|try|catch|throw|new|yield\*|yield)\b/, "keyword"],
    [/^(string|number|boolean|void|any|null|undefined|AbortSignal|AbortController|Promise|Effect)\b/, "type"],
    [/^"[^"]*"|^'[^']*'|^`[^`]*`/, "string"],
    [/^\d+(\.\d+)?/, "number"],
    [/^[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[\(\<])/, "function"],
    [/^[a-zA-Z_][a-zA-Z0-9_]*/, "variable"],
    [/^[{}()\[\];:,.<>=+\-*/&|!?$]/, "punctuation"],
    [/^\s+/, "text"],
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const [pattern, type] of patterns) {
      const match = remaining.match(pattern);
      if (match) {
        const color = COLORS[type as keyof typeof COLORS] || COLORS.text;
        tokens.push(
          <span key={key++} style={{ color }}>
            {match[0]}
          </span>
        );
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push(
        <span key={key++} style={{ color: COLORS.text }}>
          {remaining[0]}
        </span>
      );
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

export const CodeMorph: React.FC<CodeMorphProps> = ({
  codeVersions,
  transitionDuration = 30,
  holdDuration = 90,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Calculate which version we're on and transition progress
  const cycleDuration = holdDuration + transitionDuration;
  const totalVersions = codeVersions.length;
  
  const currentCycle = Math.floor(frame / cycleDuration) % totalVersions;
  const frameInCycle = frame % cycleDuration;
  
  const isTransitioning = frameInCycle >= holdDuration;
  const transitionProgress = isTransitioning 
    ? (frameInCycle - holdDuration) / transitionDuration 
    : 0;

  const currentVersionIndex = currentCycle;
  const nextVersionIndex = (currentCycle + 1) % totalVersions;

  const currentCode = codeVersions[currentVersionIndex];
  const nextCode = codeVersions[nextVersionIndex];

  const currentLines = currentCode.split("\n");
  const nextLines = nextCode.split("\n");
  const maxLines = Math.max(currentLines.length, nextLines.length);

  // Smooth easing for transitions
  const easedProgress = interpolate(
    transitionProgress,
    [0, 1],
    [0, 1],
    { easing: Easing.inOut(Easing.ease) }
  );

  // Container animation on mount
  const containerOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', monospace",
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Code Editor Container */}
      <div
        style={{
          opacity: containerOpacity,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Code Content */}
        <div
          style={{
            flex: 1,
            padding: "16px 0",
            fontSize: 14,
            lineHeight: 1.7,
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Line Numbers */}
          <div
            style={{
              paddingRight: 16,
              paddingLeft: 12,
              textAlign: "right",
              color: COLORS.lineNumber,
              userSelect: "none",
              borderRight: "1px solid #3c3c3c",
              flexShrink: 0,
            }}
          >
            {Array.from({ length: maxLines }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Lines */}
          <div style={{ flex: 1, paddingLeft: 16, paddingRight: 16, position: "relative" }}>
            {Array.from({ length: maxLines }, (_, lineIndex) => {
              const currentLine = currentLines[lineIndex] || "";
              const nextLine = nextLines[lineIndex] || "";
              const hasChange = currentLine !== nextLine;

              if (!isTransitioning || !hasChange) {
                // Show current line (or empty if beyond current code)
                const displayLine = currentLines[lineIndex];
                if (displayLine === undefined) {
                  return <div key={lineIndex} style={{ height: "1.7em" }}>&nbsp;</div>;
                }
                return (
                  <div key={lineIndex}>
                    {highlightCode(displayLine)}
                    {displayLine === "" && "\u00A0"}
                  </div>
                );
              }

              // Transitioning with change - animate between lines
              return (
                <div key={lineIndex} style={{ position: "relative", height: "1.7em" }}>
                  {/* Outgoing line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: 1 - easedProgress,
                      transform: `translateY(${-easedProgress * 8}px)`,
                      backgroundColor: currentLine && !nextLine ? COLORS.removed : "transparent",
                      paddingLeft: currentLine && !nextLine ? 4 : 0,
                      marginLeft: currentLine && !nextLine ? -4 : 0,
                    }}
                  >
                    {highlightCode(currentLine)}
                    {currentLine === "" && "\u00A0"}
                  </div>
                  
                  {/* Incoming line */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: easedProgress,
                      transform: `translateY(${(1 - easedProgress) * 8}px)`,
                      backgroundColor: !currentLine && nextLine ? COLORS.added : "transparent",
                      paddingLeft: !currentLine && nextLine ? 4 : 0,
                      marginLeft: !currentLine && nextLine ? -4 : 0,
                    }}
                  >
                    {highlightCode(nextLine)}
                    {nextLine === "" && "\u00A0"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
