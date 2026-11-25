# Portfolio Refinement — UI Redesign, Feature Enhancements & Interaction Polish

The initial portfolio transformation is already completed. This task is a refinement pass over the existing implementation.

Do not rebuild the website from scratch. Inspect the current implementation, identify the relevant components, and modify, redesign, or extend them according to the requirements below.

The overall visual direction is **minimalist, editorial, sophisticated, and interactive, with occasional dramatic moments**. The website should remain clean and understated by default, with carefully chosen animations and interactions that reward exploration.

Do not turn the website into an animation-heavy template. Every visual effect should feel deliberate.

---

# 1. Hero Section — Role Rotation

The hero section currently displays my professional roles, such as Developer and Builder.

The roles are already defined in:

`data/prash/about.ts` → `professionalDetails` → `professionalRoles`

Use this existing data source.

### Requirements

- Display the professional roles as a rotating text element beneath or within the hero heading.
- Rotate through the roles defined in `professionalRoles`.
- Implement a smooth transition between roles using a vertical slide, fade, or a combination of both.
- The outgoing role should transition out smoothly while the incoming role takes its place.
- Ensure the container has stable dimensions to prevent the surrounding hero layout from jumping when roles of different lengths appear.
- Avoid abrupt text replacement.
- Keep the animation subtle and refined.
- Ensure the animation works on mobile.
- Respect `prefers-reduced-motion`.

Do not hardcode the roles inside the component. Use the existing data.

---

# 2. Fix the "Explore Projects" CTA

The "Explore Projects" button on the home page currently inherits a black font color, making the text incorrect against its button background. Fix this issue for all buttons.

Fix the styling so that:

- The text color is explicitly set to white.
- The button maintains sufficient contrast.
- The text color does not get overridden by global, inherited, hover, or active styles.
- Hover, focus, and pressed states continue to work correctly.
- The fix follows the existing global design system in `app/globals.css`.

Do not unnecessarily redesign this button. Fix the issue cleanly.

---

# 3. Personal Card — Minimize, Maximize & Drag Interaction

The interactive personal card on the homepage needs to be enhanced.

## 3.1 Minimize and maximize controls

Add two functional controls to the card: a minimize control and a maximize control.

Use appropriate icons. These should be compact, visually unobtrusive controls positioned within the card's interaction toolbar or a visually appropriate location near the card.

### Maximize behavior

When the user clicks the maximize control:

- The card should expand into a focused, near-fullscreen overlay.
- Use a darkened or subtly blurred backdrop to separate the card from the rest of the website.
- Center the card in the viewport.
- Preserve the card's aspect ratio.
- Make the card larger while ensuring it fits within the viewport.
- Retain its 3D interaction in the expanded view.
- Animate the transition from the original card position to the expanded position.
- The expansion should feel fluid, similar to an object being brought forward.
- Include a clearly visible close or minimize control.
- Allow the user to close the expanded view using the Escape key.
- Prevent unwanted background interaction while the expanded state is active.
- Ensure it works on mobile.

### Minimize behavior

When the card is maximized, clicking the minimize control should:

- Close the expanded view.
- Transition the card back to its original position on the home page.
- Restore its original size and interaction state.
- Avoid abruptly removing the overlay.

The card must not lose its original homepage positioning or become detached from the layout after closing.

Use a clean state-management approach to handle the expanded and normal states.

---

## 3.2 Drag interaction with spring physics

The personal card should be draggable on desktop.

Implement a natural drag interaction:

- The user should be able to grab the card and move it within a controlled area.
- The card should respond to the pointer while being dragged.
- Use spring-based physics for movement and release.
- When released, the card should settle naturally rather than snapping abruptly.
- Add subtle rotational feedback while dragging.
- Movement should feel lightweight, as if the card has physical weight.
- Restrict movement so the card cannot disappear off-screen or become unusable.
- Ensure the drag interaction does not interfere with page scrolling, other buttons, or the card's maximize and minimize controls.
- The card should return to an appropriate resting position when released if the interaction is designed to be temporary.

For mobile, avoid locking the page scroll or making the card difficult to interact with. Prioritize touch accessibility and stable scrolling.

Use the existing animation library if the project already has a suitable one. Ask to download required ones. Try not to introduce unnecessary dependencies.

---

# 4. Homepage Projects — Latest Three Projects

The homepage should not render the entire projects collection.

Modify the homepage Projects section to display only the **three latest projects**, determined by descending `id` order.

### Requirements

- Sort projects by `id` in descending order.
- Select the first three after sorting.
- Do not mutate the original source array.
- Use the existing project data.
- Keep the sorting and selection logic reusable where appropriate.
- Display a "View All Projects" or equivalent CTA.
- The CTA should navigate to the complete projects listing or the appropriate projects section/page.
- Ensure the homepage project preview and the complete project listing are separate presentation concerns.

### Currently working projects

Projects with `isCurrent: true` must display an **"Actively Working"** status indicator.

Design this indicator as a restrained visual label:

- A small status dot or subtle marker.
- A short label, "Actively Working".
- Clear visual distinction without making the badge overly prominent.
- Consistent positioning within the project presentation.

Do not display this label for projects where `isCurrent` is false or absent.

---

# 5. Redesign the Projects Component

Redesign the Projects section to feel like a curated developer portfolio rather than a generic collection of project cards.

## Design direction: Editorial project showcase

Use an editorial layout with a strong hierarchy and varied compositions.

### Featured project layout

The first or most prominent project should occupy a larger visual area.

- Use a two-column layout on desktop.
- One side should contain project information: title, description, technology stack, project status, and available actions.
- The other side should contain a visual preview, image, screenshot, or existing project asset where available.
- Use a subtle border, controlled spacing, and minimal framing.
- The visual preview should be proportionally sized and visually integrated.
- Avoid unnecessarily rounded, floating card designs.

### Remaining projects

Present the other projects in a clean grid or alternating editorial rows.

Each project should display:

- Project title.
- Short description.
- Relevant technologies.
- Project status if applicable.
- A visual asset where available.
- A clear indication that the project can be explored.
- An appropriate interaction to view more details.

Use a layout that creates visual rhythm instead of repeating the exact same card design for every project.

### Hover interactions

For project items:

- Subtly lift or shift the visual element.
- Animate image scale very slightly, without excessive zoom.
- Reveal or animate an arrow or exploration indicator.
- Transition borders or background surfaces subtly.
- Keep text readable and stable.
- Ensure hover effects are not required for functionality.

### Project details modal

When a user clicks a project, open a project details modal.

The modal must display the complete available project information from the project data source.

Include, where available:

- Project title.
- Full description.
- Project image or preview.
- Technologies used.
- Project status.
- GitHub link.
- Live project link.
- Other relevant project metadata or links.

### Modal behavior

- Use a centered modal on desktop.
- Use a near-fullscreen panel on mobile.
- Provide a clear close button.
- Close on Escape.
- Close on backdrop click, provided the user clicks outside the modal content.
- Prevent background interaction while open.
- Preserve proper scroll behavior.
- Allow the modal content to scroll independently if it exceeds viewport height.
- Animate opening and closing smoothly.
- Avoid excessively rounded corners.
- Maintain keyboard accessibility.
- Ensure external links work properly.

Do not fabricate project information. Display only available data.

---

# 6. Experience Component — "View Contributions" Modal

Redesign the Experience component to make work experience easier to explore.

## Layout

Use a refined timeline or editorial experience layout.

Each experience entry should display:

- Organization.
- Role.
- Duration.
- Brief summary.
- Relevant technologies or supporting metadata if available.
- A "View Contributions" CTA.

Avoid placing every detail directly on the page. The section should remain clean and scannable.

### View Contributions functionality

Clicking "View Contributions" should open a modal containing the full details of the selected experience.

Display all available details from the experience data, including:

- Full description.
- Contributions.
- Responsibilities.
- Achievements.
- Relevant technologies.
- Additional information associated with the experience.

Use the actual data structure. If the source contains multiple contribution entries, display them clearly rather than merging them into a single paragraph.

### Modal design

- Use a refined editorial modal.
- Clearly display the organization and role at the top.
- Use a structured layout for contributions.
- Use a numbered list, timeline, or grouped bullet presentation if it improves readability.
- Keep the modal visually consistent with the project details modal.
- Ensure it is responsive.
- Support Escape, backdrop dismissal, independent scrolling, and keyboard accessibility.

The CTA should be functional for every experience entry where details are available.

---

# 7. Redesign Education Component

Redesign the Education section into a minimal, editorial layout.

### Design direction

Use a structured education timeline rather than conventional cards.

Each education entry should have a clearly separated layout with:

- Institution name as the prominent element.
- Degree or program.
- Duration.
- Relevant details.
- Academic achievements or supporting information if present in the data.

### Visual treatment

- Use subtle horizontal dividers or timeline markers.
- Align dates consistently.
- Use typography to establish hierarchy.
- Avoid decorative icons that do not add meaning.
- Avoid excessive borders, shadows, or card backgrounds.
- Ensure the layout adapts gracefully to mobile.

The section should feel like part of a professional portfolio, not a student dashboard.

---

# 8. Redesign Technical Range Component

Redesign the Technical Range section to showcase my technologies and technical capabilities more elegantly.

Do not use a large collection of generic skill badges.

### Design direction: Categorized technical index

Organize the skills into meaningful groups based on the available data.

For example, groups may include:

- Languages.
- Backend.
- Frontend.
- Databases.
- Tools and infrastructure.
- Other relevant technical categories.

Only use categories supported by the data.

### Layout

- Display category headings with strong typography.
- Present technologies as compact lists, inline compositions, or structured rows.
- Use small icons or logos only when they add value and are available or can be reliably sourced from the existing project.
- Avoid unnecessarily large skill logos.
- Avoid proficiency bars or numerical ratings unless they exist in the data.
- Use subtle transitions or category reveal interactions if appropriate.
- Maintain a clean, editorial layout.

The goal is to communicate technical breadth and organization, not to visually rank skills.

---

# 9. Redesign Achievements Component

Redesign the Achievements section to make notable achievements memorable without cluttering the website.

### Design direction

Use a compact achievement showcase with visual hierarchy.

- Make the most notable achievement visually prominent.
- Present other achievements in a structured list or compact editorial layout.
- Display title, relevant organization, date, description, or supporting details where available.
- Use restrained visual accents such as a subtle marker, separator, or small icon.
- Avoid a grid of identical large cards.
- Avoid inventing awards, rankings, statistics, or achievement descriptions.

### Interactions

- Use subtle reveal animations.
- Add a restrained hover state where appropriate.
- Ensure the layout is readable and responsive.
- Do not make interactions necessary to access the actual achievement information.

---

# 10. Navbar — Dramatic Name Typography

Redesign the left side of the navbar.

Remove the existing icon or logo from the left side.

Instead, display my name using a distinctive typographic treatment.

### Design direction

- My name should become the navbar's branding element.
- Use a dramatic, expressive font style that feels editorial or personal.
- The font should contrast subtly with the rest of the navbar typography.
- Consider a serif, distinctive display font, or another typographic style that fits the current visual design.
- Keep the name compact enough for the navbar.
- Do not use a logo icon, monogram icon, or decorative symbol in place of my name.
- Use the actual name from the existing data or current navbar implementation.
- Do not unnecessarily introduce a new font dependency if suitable fonts already exist.

### Interaction

- Add a subtle hover effect, such as a slight opacity transition or restrained movement.
- Clicking the name should navigate to the homepage.
- Ensure the name remains legible and appropriately sized on mobile.

The navbar should feel personal and distinctive without becoming oversized.

---

# 11. Mobile Navbar — Fix the Close Icon

The mobile navbar's close or cross icon is currently misaligned or incorrectly positioned on smaller screens.

Fix the existing issue.

### Requirements

- Inspect the current mobile navigation implementation.
- Correct the positioning, alignment, sizing, and spacing of the close icon.
- Ensure the icon is properly centered within its clickable area.
- Ensure the close button does not overlap the menu content.
- Ensure it remains visible on narrow screens.
- Ensure the open and close states are consistent.
- Ensure the close button has an adequate touch target.
- Ensure the menu can be opened and closed reliably.
- Ensure the menu closes when a navigation item is selected.
- Ensure the menu does not cause horizontal overflow.
- Ensure the icon has a proper accessible label.

Do not redesign the entire navbar unnecessarily to fix this issue.

---

# 12. Footer — Social Icons and Personal Card Download

## Social icons

The footer should display my social icons in the same style and visual treatment used on the About page.

### Requirements

- Inspect the existing social links and icon presentation on the About page.
- Reuse the existing implementation or shared component rather than duplicating it.
- Use the same icon style, spacing, interaction behavior, and links.
- Ensure the icons are correctly positioned within the footer.
- Use only the social links available in the data.
- Provide tooltips or accessible labels for icon-only links.
- Ensure hover, focus, and pressed states are implemented.

## "Get My Card" CTA

Add a prominent but tasteful "Get My Card" action in the footer.

The action should download the original personal card image:

`public/user/personal/card.png`

### Download interaction — make it memorable

Do not make this a plain download link with no feedback.

When the user clicks "Get My Card":

1. Trigger the download of the actual card image.
2. Animate the CTA into a brief download state.
3. Use a visual motion effect that suggests the card is being collected or transferred.
4. Consider a brief card-thumbnail motion, a subtle card lift, a download arrow transition, or a restrained flying-card effect.
5. Provide brief feedback that the download has started or completed, where technically possible.
6. Restore the CTA to its original state after the animation.

The animation should feel polished and playful in a restrained way. It should not delay the actual download or make the action unreliable.

Avoid excessive confetti or noisy animation. The drama should come from a carefully executed motion effect.

Ensure the action works on mobile and desktop.

---

# 13. About Page — Limit Projects

The About page currently displays all projects.

Modify the About page to display only three projects.

### Requirements

- Use the same descending `id` sorting logic as the homepage project selection.
- Show the three latest projects.
- Avoid duplicating project sorting logic across multiple pages if it can be extracted into a shared utility.
- Do not mutate the original project data.
- Keep the existing About page structure otherwise, unless small layout refinements are necessary.

---

# 14. Workshop Details Page — Back Button

Add a back button to the workshop details page.

### Requirements

- Position it near the top of the workshop details content, before the primary page heading or breadcrumb.
- Use a left-arrow icon with a clear "Back" label.
- Provide subtle hover and pressed states.
- Ensure the button is accessible and responsive.

### Navigation behavior

- If browser navigation history is available and appropriate, return to the previous page.
- If the user opened the workshop details page directly or there is no useful previous route, fall back to the workshops listing page.
- Do not rely exclusively on `history.back()` without a fallback.
- Ensure the back button never navigates to an unrelated external page.

The button should feel integrated into the workshop page design rather than like a default browser control.

---

# 15. Workshop Page — See Testimonials

Add a "See Testimonials" link or CTA to the workshop page.

### Requirements

- Inspect the existing workshop page and testimonial data or implementation.
- Use the actual testimonials available in the project.
- Position the CTA where it naturally fits within the workshop page, such as near workshop information, participant feedback, or the page's secondary navigation.
- Navigate to the existing testimonials section or testimonials route, depending on the current implementation.
- If testimonials are on the same page, use smooth scrolling.
- If testimonials are on a separate route, navigate correctly.
- Ensure the CTA is visible and functional.
- Do not invent testimonials or participant feedback.
- Maintain the existing workshop functionality.

---

# 16. Scroll Reveal Animations — Multiple Motion Styles

Implement a refined scroll-reveal system across the website.

Do not use the same fade-in animation for every element.

The animations should create a sense of progression and visual storytelling as the visitor moves through the portfolio.

### Motion styles

Use a carefully selected combination of the following.

#### A. Fade and upward movement

Use for:

- Section headings.
- Supporting text.
- General content blocks.

Behavior:

- Elements begin with slightly reduced opacity.
- They move upward a small distance.
- They transition into their final position.
- The motion should feel smooth and natural.

#### B. Staggered reveal

Use for:

- Project lists.
- Achievement entries.
- Skill groups.
- Social links where appropriate.

Behavior:

- Reveal elements sequentially with a short stagger.
- Avoid excessive delays.
- Ensure the entire section does not take too long to become visible.
- Avoid stagger delays that become distracting for larger collections.

#### C. Horizontal reveal

Use for:

- Experience timeline entries.
- Editorial project layouts.
- Selected content rows.

Behavior:

- Content can subtly enter from the left or right.
- Direction should alternate selectively where it improves composition.
- Avoid alternating every single element mechanically.

#### D. Image reveal

Use for:

- Project imagery.
- Featured visuals.
- Selected content previews.

Behavior:

- Use a subtle clipping, scale, or opacity reveal.
- Avoid dramatic image zooming.
- Keep image dimensions stable to prevent layout shifts.

#### E. Section transition

Use for:

- Large section boundaries.
- Selected major content blocks.

Behavior:

- Create subtle transitions between sections using opacity, translation, or restrained visual movement.
- Do not animate entire sections in a way that delays their content or causes scroll instability.

### Animation implementation

- Use the existing animation library if available.
- Reuse animation utilities and components.
- Avoid duplicating animation logic in every component.
- Keep animations performant.
- Avoid unnecessary JavaScript scroll listeners.
- Prefer the existing animation framework or efficient intersection-based mechanisms.
- Ensure content remains accessible when animations are disabled.
- Respect `prefers-reduced-motion`.
- Do not animate elements repeatedly every time the user scrolls past them unless there is a specific design reason.

The overall scroll experience should feel smooth, varied, and deliberate, not like an animated template.

---

# 17. Design Consistency and Styling

All refinements must remain consistent with the existing design system.

- Use `app/globals.css` as the central source for global design tokens.
- Reuse the existing color system.
- Reuse typography conventions.
- Reuse spacing conventions.
- Maintain consistent borders, shadows, interaction states, and transition durations.
- Avoid introducing new arbitrary colors or styles.
- Avoid unnecessary gradients, excessive glow, and overly rounded cards.
- Do not introduce a separate design system.
- Keep component styling organized according to the existing architecture.

The visual direction is minimalist with occasional drama.

**Minimalism should be the default. Dramatic interactions should be reserved for specific moments, such as the 3D card, project exploration, or card download.**

---

# 18. Component Architecture

Follow the existing component-based architecture.

- Modify the existing components where possible.
- Create dedicated components for new features if necessary.
- Keep modals reusable if project and experience modals share interaction patterns.
- Keep the personal card interactions isolated within the card component.
- Reuse social icon components.
- Extract shared project-selection logic.
- Reuse animation utilities where appropriate.
- Avoid unnecessary component duplication.
- Avoid creating overly abstract components that make the code harder to maintain.

Do not place the entire implementation into a single page file.

---

# 19. Validation and Testing

After implementation, verify the changes.

### Verify the following:

- Professional roles rotate correctly using the existing data.
- Explore Projects button text is white.
- Personal card minimizes and maximizes correctly.
- Escape closes the maximized card.
- Card dragging works with natural spring physics.
- Card dragging does not interfere with navigation controls or scrolling.
- Homepage displays exactly three latest projects based on descending ID.
- About page displays exactly three latest projects.
- Projects marked `isCurrent: true` display the Actively Working indicator.
- Project details modal opens and displays the correct project.
- Experience View Contributions modal displays the correct experience details.
- Education redesign is responsive.
- Technical Range redesign is responsive.
- Achievements redesign is responsive.
- Footer social icons match the About page.
- Footer Get My Card CTA downloads the correct asset and displays its animation.
- Navbar branding displays my name and no logo icon.
- Mobile navbar close icon is correctly aligned.
- Workshop details back button works, including its fallback.
- Workshop See Testimonials link works.
- Scroll reveal animations work across different sections.
- Animations respect reduced-motion preferences.
- No broken links or nonfunctional buttons remain.
- No horizontal overflow occurs on mobile.
- No existing workshop functionality has been broken.

Run the available lint and build checks and fix any errors caused by these changes.

Do not claim successful validation if the checks were not actually executed.

---

# 20. Execution Instructions

This is an implementation task, not a planning task.

First inspect the existing components and data structures relevant to these changes. Do not assume the data shape based on the requirements alone.

Implement the requested changes in the existing codebase. Preserve working functionality and avoid unrelated refactoring.

Do not create dummy data, placeholder content, or unnecessary dependencies.

Do not leave unfinished features.

Use design judgment to refine the visual details beyond the explicit instructions, but do not change the overall design direction.

The final result should feel like a refined personal portfolio with carefully designed layouts, polished interactions, subtle motion, and a few memorable moments of drama.

**Prioritize visual quality, functional correctness, maintainability, and a cohesive user experience equally.**