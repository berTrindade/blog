import { Composition, Folder } from "remotion";
import { CodeWalkthrough } from "./components/CodeWalkthrough";

export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="Code-Tutorials">
      <Composition
        id="CodeWalkthrough"
        component={CodeWalkthrough}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          code: `const greeting = "Hello, World!";
console.log(greeting);

function add(a: number, b: number) {
  return a + b;
}

const result = add(2, 3);
console.log(result); // 5`,
          language: "typescript",
          title: "Getting Started with TypeScript",
          typingSpeed: 2,
          highlightLines: [4, 5, 6],
        }}
      />
    </Folder>
  );
};
