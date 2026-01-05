---
title: "Animation Principles with Motion"
date: "2024-12-15"
category: Engineering
excerpt: "Master the 12 principles of animation."
image: https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=400&fit=crop
---

Animation on the web has evolved from simple transitions to sophisticated, meaningful interactions. Motion.dev makes it easy to implement animation principles that guide users and create delightful experiences.[^1]

## Why Animation Matters

Great animation is purposeful, subtle, and rooted in principles that have guided designers for decades. The difference between good and great often comes down to intention.

## Implementation with Motion

```tsx
<motion.div
  animate={{
    scaleX: isSquashed ? 0.8 : 1,
    scaleY: isSquashed ? 1.2 : 1,
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 20
  }}
/>
```

The key is using spring physics rather than linear transitions. This creates natural, organic movement.

## Best Practices

- Use anticipation for important transitions
- Keep it quick - don't make users wait
- Save it for moments that need extra clarity

## The Rule of 300ms

Keep most UI animations under 300ms. Anything longer starts to feel slow and gets in the user's way.[^2]

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{
    type: "spring",
    stiffness: 400,
    damping: 17
  }}
/>
```

The spring physics make interactions feel physical and satisfying.

Just add the `layout` prop and Motion handles the rest:

```tsx
<motion.div layout>
  {/* Content that changes */}
</motion.div>
```

## Code Morphing Animations

One of the most impressive uses of Motion is animating code changes. This creates smooth transitions between different code states, perfect for tutorials and documentation.

<CodeMorphDemoV2 />

Click play to see the code smoothly transition with character-level animations. Notice how each token animates individually with spring physics, creating a fluid morphing effect.

These animations are built with Motion's `AnimatePresence` and staggered animations:

```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={currentState}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {lines.map((line, i) => (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.03 }}
      >
        {line}
      </motion.div>
    ))}
  </motion.div>
</AnimatePresence>
```

The staggered delay (`i * 0.03`) creates the cascading effect you see in the code morph animation.

## Key Takeaways

1. **Use spring physics** - They feel more natural than easing curves
2. **Keep it fast** - Under 300ms for most interactions
3. **Be purposeful** - Every animation should have a reason
4. **Test on devices** - Animations should work on touch and desktop

## Getting Started

Install Motion in your React project:

```bash
npm install motion
```

Then import and use the motion components:

```tsx
import { motion } from 'motion/react'

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Hello World
    </motion.div>
  )
}
```

[^1]: Motion.dev is a production-ready animation library trusted by companies like Framer and Figma. It combines the performance of native browser animations with the flexibility of JavaScript.

[^2]: According to research on perceived performance, animations under 300ms feel instant to users. Anything longer starts to register as "waiting" which degrades the user experience.

[^3]: Motion's FLIP (First, Last, Invert, Play) technique allows it to animate between completely different layouts smoothly, something that's impossible with CSS alone.

## Resources

- [Motion.dev Documentation](https://motion.dev/docs/react) - Complete guide to Motion for React
- [Motion Examples](https://motion.dev/examples) - Interactive examples you can copy
- [12 Principles of Animation](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation) - Original Disney animation principles
- [Motion vs GSAP](https://motion.dev/docs/gsap-vs-motion) - Comparison with other animation libraries
