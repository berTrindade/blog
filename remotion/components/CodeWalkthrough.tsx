import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
} from "remotion";

// Theme colors (VS Code Dark+)
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
  highlight: "rgba(255, 255, 0, 0.1)",
};

type CodeWalkthroughProps = {
  code: string;
  language: string;
  title: string;
  typingSpeed?: number;
  highlightLines?: number[];
};

// Simple syntax highlighter for TypeScript/JavaScript
const highlightCode = (code: string): React.ReactNode[] => {
  const tokens: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  const patterns: [RegExp, string][] = [
    [/^\/\/.*/, "comment"],
    [/^(const|let|var|function|return|if|else|for|while|import|export|from|type|interface)\b/, "keyword"],
    [/^(string|number|boolean|void|any|null|undefined)\b/, "type"],
    [/^"[^"]*"|^'[^']*'|^`[^`]*`/, "string"],
    [/^\d+(\.\d+)?/, "number"],
    [/^[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/, "function"],
    [/^[a-zA-Z_][a-zA-Z0-9_]*/, "variable"],
    [/^[{}()\[\];:,.<>=+\-*/&|!?]/, "punctuation"],
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

// Cursor component with blinking effect
const Cursor: React.FC<{ frame: number; blinkFrames?: number }> = ({
  frame,
  blinkFrames = 15,
}) => {
  const opacity = interpolate(
    frame % blinkFrames,
    [0, blinkFrames / 2, blinkFrames],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <span
      style={{
        opacity,
        backgroundColor: COLORS.text,
        width: 2,
        height: "1.2em",
        display: "inline-block",
        marginLeft: 2,
        verticalAlign: "text-bottom",
      }}
    />
  );
};

export const CodeWalkthrough: React.FC<CodeWalkthroughProps> = ({
  code,
  title,
  typingSpeed = 2,
  highlightLines = [],
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate typed characters based on frame
  const typedChars = Math.floor(frame / typingSpeed);
  const typedCode = code.slice(0, typedChars);
  const isTypingComplete = typedChars >= code.length;

  // Title animation
  const titleOpacity = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const titleY = interpolate(titleOpacity, [0, 1], [20, 0]);

  // Code container animation
  const codeContainerOpacity = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  // Split code into lines for line numbers and highlighting
  const lines = typedCode.split("\n");
  const totalLines = code.split("\n").length;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        padding: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title */}
      <Sequence from={0} durationInFrames={durationInFrames} premountFor={fps}>
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            marginBottom: 40,
          }}
        >
          <h1
            style={{
              color: COLORS.text,
              fontSize: 48,
              fontWeight: 600,
              margin: 0,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {title}
          </h1>
        </div>
      </Sequence>

      {/* Code Editor */}
      <Sequence from={15} durationInFrames={durationInFrames - 15} premountFor={fps}>
        <div
          style={{
            opacity: codeContainerOpacity,
            flex: 1,
            backgroundColor: "#252526",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Editor Header */}
          <div
            style={{
              backgroundColor: "#323233",
              padding: "12px 20px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#27ca40" }} />
            <span style={{ marginLeft: 12, color: COLORS.lineNumber, fontSize: 14 }}>
              example.ts
            </span>
          </div>

          {/* Code Content */}
          <div
            style={{
              padding: "20px 0",
              fontSize: 24,
              lineHeight: 1.6,
              display: "flex",
            }}
          >
            {/* Line Numbers */}
            <div
              style={{
                paddingRight: 20,
                paddingLeft: 20,
                textAlign: "right",
                color: COLORS.lineNumber,
                userSelect: "none",
                borderRight: "1px solid #3c3c3c",
              }}
            >
              {Array.from({ length: totalLines }, (_, i) => (
                <div key={i} style={{ opacity: i < lines.length ? 1 : 0.3 }}>
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Code */}
            <div style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
              {lines.map((line, lineIndex) => {
                const isHighlighted = highlightLines.includes(lineIndex + 1);
                return (
                  <div
                    key={lineIndex}
                    style={{
                      backgroundColor: isHighlighted ? COLORS.highlight : "transparent",
                      marginLeft: isHighlighted ? -20 : 0,
                      marginRight: isHighlighted ? -20 : 0,
                      paddingLeft: isHighlighted ? 20 : 0,
                      paddingRight: isHighlighted ? 20 : 0,
                      borderLeft: isHighlighted ? `3px solid ${COLORS.keyword}` : "3px solid transparent",
                    }}
                  >
                    {highlightCode(line)}
                    {lineIndex === lines.length - 1 && !isTypingComplete && (
                      <Cursor frame={frame} />
                    )}
                    {line === "" && "\u00A0"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
