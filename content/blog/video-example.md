---
title: Video Component Example
date: 2024-12-08
category: Personal
excerpt: Embed videos in your blog posts.
image: https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=400&fit=crop
publishedDate: Dec 2024
lastEdited: Dec 2025
---

This post demonstrates how to use videos and heading anchor links.

## The starting point

Here's how you can embed a video in your blog post. Videos will autoplay, loop, and be muted by default.

<Video src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" alt="Example demonstration" caption="This is how the component works" />

You can also customize the video behavior:

<Video 
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" 
  alt="Example with controls" 
  caption="Video with controls enabled"
  controls={true}
  autoplay={false}
/>

## Adding interactions

Videos automatically play when they come into view, providing a smooth user experience similar to the reference site.

## Performance tips

Keep your video files optimized:
- Use MP4 format for best browser compatibility
- Compress videos to reduce file size
- Consider using shorter clips for better performance

## Heading anchor links

All headings now have anchor links that appear on hover. Click the link icon next to any heading to copy the URL to that section.

Try hovering over any heading on this page - you'll see a link icon appear. Clicking it copies the direct link to that heading!
