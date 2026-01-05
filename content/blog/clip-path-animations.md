---
title: The Magic of Clip Path
date: 2024-12-10
category: Engineering
excerpt: Create stunning effects with CSS clip-path.
image: https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=400&fit=crop
---

`clip-path` is often used for trimming a DOM node into specific shapes, like triangles. But what if I told you that it's also great for animations?

In this article, we'll dive into `clip-path` and explore some cool things you can do with it. After reading it, you'll start seeing this CSS property being used *everywhere*.

## The Basics

The `clip-path` property is used to clip an element into a specific shape. We create a clipping region with it, content outside of this region will be hidden, while content inside will be visible. This allows us to easily turn a rectangle into a circle for example.

```css
.circle {
  clip-path: circle(50% at 50% 50%);
}
```

This has no effect on layout meaning that an element with `clip-path` will occupy the same space as an element without it, just like `transform`.

## Positioning

We positioned our circle above using a coordinate system. It starts at the top left corner (0, 0). `circle(50% at 50% 50%)` means that the circle will have a border radius of 50% and will be positioned at 50% from the top and 50% from the left, which is the center of the element.

There are other values like `ellipse`, `polygon`, or even `url()` which allows us to use a custom SVG as the clipping path, but we are going to focus on `inset` as that's what we'll be using for all animations in this post.

The inset values define the top, right, bottom, and left offsets of a rectangle. This means that if we use `inset(100%, 100%, 100%, 100%)`, or `inset(100%)` as a shortcut, we are "hiding" (clipping) the whole element. An inset of `(0px 50% 0px 0px)` would make the right half of the element invisible, and so on.

We now know that clip path can "hide" parts of an element, this opens up a lot of possibilities for animations. Let's start discovering them.

## Comparison Sliders

I'm sure you've seen those before and after sliders somewhere. There are many ways to create one, we could have two divs with overflow hidden and change their width for example, but we can also use more performant approach with `clip-path`.

We start by overlaying two images on top of each other. We then create a `clip-path: (0 50% 0 0)` that hides the right half of the top image and adjust it based on the drag position.

This way we get a hardware-accelerated interaction without additional DOM elements (we'd need additional element for overflow hidden in the width approach).

Knowing that we can create such comparison slider with `clip-path` opens the door to many other use cases. We could use it for a text mask effect for example.

## Animating Images

`clip-path` can also be used for an image reveal effect. We start off with a `clip-path` that covers the whole image so that it's invisible, and then we animate it to reveal the image.

```css
.image-reveal {
  clip-path: inset(0 0 100% 0);
  animation: reveal 1s forwards cubic-bezier(0.77, 0, 0.175, 1);
}

@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
```

We could also do it with a height animation, but there are some benefits to using `clip-path` here. `clip-path` is hardware-accelerated, so it's more performant than animating the height of the image. Using `clip-path` also prevents us from having a layout shift when the image is revealed, as the image is already there, it's just clipped.

## Scroll Animations

The image reveal effect must be triggered when the image enters the viewport; otherwise, the user will never see the image being animated. So how do we do that?

I usually use Framer Motion for animations, so I'll show you how to do it with it. But if you are not using this library in your project already, I'd suggest you use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), as Framer Motion is quite heavy.

Framer Motion exposes a hook called `useInView` which returns a boolean value indicating whether the element is in the viewport or not. We can then use this value to trigger the animation.

## Tabs Transition

I'm sure you've seen this one before as well. The problem here is that the active tab has a different text color than the inactive ones. Usually, people apply a transition to the text color and that kinda solves it.

This is okay-ish, but we can do better.

We can duplicate the list and change the styling of it so that it looks active (blue background, white text). We can then use `clip-path` to trim the duplicated list so that only the active tab in that list is visible. Then, upon clicking, we animate the `clip-path` value to reveal the new active tab.

This way we get a seamless transition between the tabs, and we don't have to worry about timing the color transition, which would never be seamless anyway.

You might say that not everyone is going to notice the difference, but I truly believe that small details like this add up and make the experience feel more polished. Even if they go unnoticed.

## Hold to Confirm Buttons

Another great use case for `clip-path` is creating "hold to confirm" buttons. These are buttons that require the user to hold them down for a moment before the action is triggered - perfect for destructive actions like delete, or important actions like share.

The technique is simple: we overlay two versions of the button on top of each other. The top layer has `clip-path: inset(100% 0 0 0)` to hide it completely. As the user holds the button, we animate the clip-path to `inset(0)`, revealing the confirmation state from bottom to top.

<ClipPathButtonDemo />

Try holding any of these buttons! The animation gives users visual feedback and prevents accidental clicks.

## Clip Path is Everywhere

Now that you know how to animate with `clip-path`, you should start seeing it being used in many places. The beauty of `clip-path` is that once you understand the basics, you can create many great animations with it - it's just a matter of creativity.
