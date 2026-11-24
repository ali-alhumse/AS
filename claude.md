AA Birthday Project — Development Instructions

1. Project Identity

This project is a personal interactive birthday experience built with HTML, CSS, Vanilla JavaScript, and Canvas.

The purpose of development is to improve the existing project technically and visually while preserving its original identity, content, story, and emotional experience.

The project must remain a static website without a build step.

2. Non-Negotiable Requirements

The following requirements must never be violated without explicit approval from the project owner:

- Preserve every original scene.
- Preserve the original scene order.
- Preserve all original text, messages, names, and personal content.
- Preserve all original photographs and assets.
- Preserve the original visual identity and color direction.
- Preserve all existing interactions and meaningful animations.
- Do not remove features simply because they are difficult to refactor.
- Do not replace original content with placeholders.
- Do not invent new personal content.
- Do not redesign the project into a different experience.
- Do not introduce breaking changes to the original user journey.

The intended outcome is the same experience, implemented more professionally.

3. Technology Constraints

Use only:

- HTML5
- CSS3
- Vanilla JavaScript
- Native JavaScript ES Modules
- Canvas API
- Browser-native APIs

Do not introduce:

- Vite
- React
- Vue
- Angular
- Next.js
- TypeScript
- Webpack
- Parcel
- Other bundlers or build systems
- New third-party libraries without explicit approval

The project must remain directly deployable as a static website.

Native ES Modules are allowed. If modules require a local server for development, use an existing lightweight static server or an approved development method. This must not introduce a build step.

4. Development Workflow

All significant changes must follow this sequence:

1. Inspect the existing implementation.
2. Understand its current behavior.
3. Identify the exact scope of the change.
4. Prepare a small implementation plan.
5. Implement the change.
6. Test the affected scene.
7. Test adjacent scenes and transitions.
8. Review the diff.
9. Report the results.
10. Wait for approval before proceeding to the next major phase.

Do not perform a complete rewrite in a single operation.

Do not modify multiple unrelated systems in one phase.

5. Repository Safety

Before modifying files:

- Inspect the current Git status.
- Identify the current branch.
- Check for uncommitted user changes.
- Preserve existing user work.
- Create or use an approved refactoring branch.
- Keep the original project recoverable.

Never:

- Force push.
- Reset user changes.
- Delete branches.
- Rewrite Git history.
- Push to the main branch without approval.
- Commit unrelated changes.
- Overwrite original assets without approval.

Use small, meaningful commits when Git access is available.

6. Architecture Guidelines

The project should gradually move toward a modular architecture.

Recommended responsibilities:

- Application bootstrap
- Scene or slide management
- Scene lifecycle management
- Animation management
- Event management
- Canvas utilities
- Responsive utilities
- Storage utilities
- Individual scene modules
- Shared UI components
- Data and content files
- Organized CSS files

Prefer small, cohesive modules with clear responsibilities.

Avoid:

- Large monolithic JavaScript files
- Excessive global variables
- Repeated animation loops
- Repeated event listener registration
- Inline CSS for complex components
- HTML documents nested inside scene markup
- Unnecessary abstractions
- Premature design patterns
- Overengineering

Do not introduce a complex architecture unless it solves a demonstrated problem.

7. Scene Lifecycle

Each scene should have a clear lifecycle where appropriate:

- mount: create the scene
- enter: start scene-specific behavior
- exit: stop active behavior and remove listeners
- destroy: release resources when necessary

When leaving a scene:

- Stop its animation loops.
- Cancel scheduled animation frames.
- Clear timers.
- Remove event listeners.
- Stop scene-specific audio.
- Prevent hidden scenes from continuing expensive work.

Do not create multiple active animation loops for the same scene.

8. Animation Guidelines

Preserve original animations and improve their quality.

Priorities:

- Smooth movement
- Consistent timing
- Appropriate easing
- Natural transitions
- Correct touch interaction
- Efficient rendering
- Stable Canvas sizing
- Proper device pixel ratio handling
- Reduced unnecessary work

Use requestAnimationFrame for visual animation.

Use delta time where appropriate to avoid frame-rate-dependent movement.

Avoid excessive particle counts, unnecessary object allocation, repeated expensive calculations, and continuous animation when the scene is inactive.

Do not add visual effects merely for decoration. Every animation must support the scene and its emotional purpose.

9. Responsive Design

The project must work on:

- Small mobile phones
- Large mobile phones
- Tablets
- Laptops
- Desktop screens
- Portrait orientation
- Landscape orientation

Pay particular attention to:

- Arabic text and RTL layout
- Safe areas
- Dynamic viewport height
- Canvas resizing
- Device pixel ratio
- Text wrapping
- Button touch targets
- Gallery positioning
- Preventing accidental horizontal overflow

Prefer flexible CSS using clamp(), min(), max(), rem, dvh, aspect-ratio, and appropriate media queries.

Do not use arbitrary large margins or fixed offsets to force elements into position.

10. Visual Design

Preserve the original dark, romantic, pink, and purple visual direction.

Improve consistency across:

- Colors
- Typography
- Spacing
- Buttons
- Cards
- Shadows
- Gradients
- Glow effects
- Borders
- Transitions

Use CSS custom properties for shared design tokens.

Do not replace the existing visual identity with a generic template.

11. Accessibility and User Experience

Where appropriate:

- Support keyboard navigation.
- Provide visible focus states.
- Add accessible labels to interactive controls.
- Add appropriate image alt text.
- Support prefers-reduced-motion.
- Keep controls usable on touch screens.
- Provide ways to skip long animations.
- Avoid blocking the user unnecessarily.

12. Performance and Reliability

Prioritize:

- Efficient Canvas rendering
- Lazy loading of non-critical images
- Appropriate image dimensions
- Avoiding layout shifts
- Cleaning up resources
- Preventing duplicate listeners
- Preventing memory leaks
- Avoiding unnecessary DOM updates
- Handling missing assets gracefully
- Handling JSON loading errors
- Avoiding console errors

Do not optimize based on assumptions. Identify the bottleneck before making major performance changes.

13. Testing Requirements

After each meaningful change, verify:

- The affected scene works.
- The scene can be entered and exited.
- Scene transitions work.
- Buttons and interactions work.
- Animations start and stop correctly.
- Resizing does not break the scene.
- The project remains usable on mobile.
- No new console errors are introduced.

At the end of each phase, provide:

- Files changed
- Summary of changes
- Tests performed
- Test results
- Known limitations
- Remaining risks

Never claim a test passed unless it was actually performed.

14. Documentation

Maintain project documentation when necessary.

Important documents:

- CLAUDE.md
- docs/PROJECT_ANALYSIS.md
- docs/REFACTOR_PLAN.md
- docs/ARCHITECTURE.md
- docs/TESTING.md

Do not rewrite documentation unnecessarily.

Keep documentation consistent with the actual implementation.

15. Approval Rules

The project owner must approve:

- Removing or replacing any original scene
- Changing scene order
- Changing original content
- Replacing original assets
- Adding new dependencies
- Introducing a build system
- Changing the project's core technology
- Major visual redesigns
- Large-scale changes outside the approved phase

When uncertain, stop and ask instead of making an irreversible assumption.

16. Definition of Done

A phase is complete only when:

- Its intended changes are implemented.
- The original behavior is preserved.
- The affected scenes have been tested.
- No known regression remains unresolved.
- The changes have been reviewed.
- The results have been reported.

The final project must preserve the original experience while being cleaner, more maintainable, more responsive, more performant, and more polished.
