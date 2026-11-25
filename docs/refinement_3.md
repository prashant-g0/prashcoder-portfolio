# Portfolio Refinement — Navigation, Workshops, Coding Profiles, Certifications & Footer Enhancements

This is a refinement task on the existing portfolio. The portfolio has already undergone previous redesign and implementation passes. Do not rebuild it or introduce unrelated changes.

Maintain the existing design direction: **minimalist, editorial, sophisticated, with restrained dramatic interactions**. Focus on functional correctness, consistent design, responsiveness, and polish.

Inspect the relevant components and data structures before implementing. Use existing components and architecture wherever possible.

---

## 1. Fix RoleRotator — Role Text Is Being Truncated

The role rotator currently truncates longer professional roles. For example, "Open Source Contributor" appears as "Open Source", and "Backend Developer" appears as "Backend".

Inspect the `RoleRotator` component, its parent headline, and all related styles.

### Requirements

- Display each role in its entirety.
- Do not use fixed widths, restrictive `max-width`, ellipsis, line-clamping, or horizontal overflow clipping that truncates the role.
- Ensure the animation mask clips vertically only if necessary, not horizontally.
- Ensure the rotator can accommodate the longest role in `professionalDetails.professionalRoles`.
- Preserve the existing rotating animation and transition style.
- Prevent layout shifts where reasonably possible without sacrificing readability.
- On mobile, allow the headline and role to wrap naturally.
- Do not modify the role data to shorten labels.
- Respect `prefers-reduced-motion`.

Identify and fix the actual CSS/layout cause of truncation rather than applying arbitrary width overrides.

---

## 2. Navbar — Make It Sticky

The navbar currently disappears when scrolling.

Make the navbar persistently visible as the user scrolls through the website.

### Requirements

- Implement sticky or fixed positioning appropriate to the current navbar layout.
- Keep the navbar visible throughout page scrolling.
- Ensure it remains above page content using an appropriate stacking context.
- Avoid covering section headings or content when navigating to anchors.
- Add suitable scroll offsets or `scroll-margin-top` where required.
- Maintain the existing navbar design and typography.
- Avoid excessive shadows or heavy background treatments.
- If a background surface or blur is needed to preserve readability against scrolling content, use a subtle treatment.
- Ensure sticky behavior works on desktop and mobile.
- Ensure the mobile navigation menu remains functional when the navbar is sticky.
- Prevent content from jumping when the navbar changes state.

The navbar should feel integrated into the page, not like a floating overlay that obstructs content.

---

## 3. Project Card — Arrange Project Links in a Row

Project links currently need better positioning and layout.

Arrange the available project actions in a horizontal row.

### Requirements

- Display available project links in a single horizontal row where space allows.
- Examples include Live Project, GitHub, documentation, or other links present in the project data.
- Use compact text-based actions with appropriate icons.
- Align the links consistently within the project layout.
- Use subtle spacing and separators if appropriate.
- Do not make every link a large button.
- Keep links distinct from the action that opens project details.
- Clicking a project link must not trigger the project details modal.
- On mobile, allow wrapping into multiple rows if necessary rather than forcing overflow.
- Ensure hover, focus, and pressed states work.
- Ensure external links are handled safely.

The links must be accessible directly on the project presentation without opening the details modal.

---

## 4. Fix Icon Issue on `app/page.tsx`

Inspect `app/page.tsx` and identify the icon-related issue.

- Fix the underlying issue with the icon import, rendering, styling, or usage.
- Follow the project's existing icon library and implementation conventions.
- Do not introduce a new icon library unnecessarily.
- Ensure the icon renders correctly across supported screen sizes.
- Ensure its styling is consistent with the current design system.

Do not change unrelated functionality in `app/page.tsx`.

---

## 5. Workshop Listing — Make Workshop Cards Clickable

Workshop cards on the workshop listing page should be clickable.

### Requirements

- Make the card surface navigable to the corresponding workshop details page.
- Use the existing workshop route structure.
- Ensure the card has an appropriate clickable interaction.
- Provide subtle hover feedback, such as a slight border transition, image movement, or restrained elevation.
- Ensure the card has a clear interactive indication.
- Preserve keyboard accessibility.
- Avoid nesting interactive links or buttons in ways that cause invalid HTML or interaction conflicts.
- Clicking secondary actions such as Register must not accidentally trigger the card navigation.

The entire non-interactive card surface should behave as a navigational link or equivalent accessible interaction.

---

## 6. Workshop Listing — Add Register CTA

Add a Register CTA directly to each workshop card.

### Requirements

- Display the Register button within the workshop card.
- Use the existing registration functionality, registration route, or registration link associated with the workshop.
- If registration is handled on the workshop details page, navigate to the appropriate registration section or details route where the user can register.
- Do not invent registration functionality if the existing application has a defined registration workflow.
- Ensure clicking Register does not trigger the card's general navigation twice.
- Use an appropriate button/link implementation.
- Provide hover, focus, and pressed states.
- Ensure the button is usable on mobile.

The Register action should be visually distinct from the card's general click interaction.

---

## 7. Workshop Register Button — Fix Text Color

The Register button on the workshop details page currently renders black text, despite being intended to have white text.

Fix the button styling.

### Requirements

- Explicitly apply the intended white foreground color.
- Ensure the foreground color does not get overridden by global styles or inherited text styles.
- Ensure the button maintains sufficient contrast.
- Check hover, focus, active, disabled, and loading states if applicable.
- Ensure the button follows the project's existing design system.

### Audit all buttons

Inspect the buttons throughout the website for similar color inheritance issues.

- Check foreground and background colors.
- Ensure buttons explicitly define the appropriate foreground when needed.
- Ensure hover, focus, pressed, disabled, and loading states remain consistent.
- Identify and fix any buttons where inherited styles cause incorrect colors or poor contrast.
- Do not unnecessarily redesign every button.
- Do not apply blanket CSS that overrides all button colors without considering variants.

Buttons should follow their assigned design tokens or component variants rather than relying on accidental inheritance.

---

## 8. Footer — "Visit Me" Location Preview

My location data is available in:

`data/prash/about.ts` → `contact` → `location`

The location structure includes:

- City.
- State.
- Country.
- Latitude.
- Longitude.

Use the actual values from the data.

Add a "Visit Me" action card similar to others in the footer, positioned below or alongside the Get My Resume CTA in the footer CTA area.

### Hover map preview

On desktop hover, display a compact map preview in a floating popover.

The preview should:

- Show an actual map using a free map integration.
- Use OpenStreetMap-based tiles or another free map provider appropriate for the implementation.
- Use the coordinates from `data/prash/about.ts`.
- Center the preview on the actual coordinates.
- Display an appropriate location marker.
- Use a compact preview size, approximately 280–340px wide and 180–220px tall, adapting to available space.
- Use a restrained border and shadow.
- Animate the preview into view smoothly.
- Avoid covering the primary footer CTA.
- Close when the user moves away or clicks outside, as appropriate.
- Be accessible and usable on touch devices.

Do not use fake map screenshots or decorative map illustrations.

### Click behavior

When the user clicks "Visit Me":

- Open Google Maps with the actual latitude and longitude.
- Use the coordinate-based Google Maps URL.
- const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
- Open in a new tab.
- Ensure the link is safe.

Use the actual location data, not the example coordinates.

### Implementation

Use a free map integration such as OpenStreetMap.

Prefer an implementation that does not require an API key. If a lightweight embedded map is sufficient, use it rather than introducing an unnecessary map dependency.

Do not hardcode the coordinates in the component.

---

## 9. Coding Profiles Component

Add a reusable, compact Coding Profiles component using the data available in:

`data/prash/about.ts` → `professionalDetails` → `codingProfiles`

### Placement

On the About page:

- Place the component above the Latest Work section.

On the Experience page:

- Place the component between work and education component.
- Adapt the layout responsively.

### Design direction

Create a compact horizontal profile index.

- Display profile names or labels.
- Use the relevant platform icon where available.
- Display username or supporting metadata if available.
- Provide a clear external link to each coding profile.
- Use subtle hover transitions.
- Avoid large cards or badge-heavy layouts.
- Keep the component visually compact.
- Use only data available in `codingProfiles`.

### Interaction

- Each profile entry must be clickable.
- External links should open appropriately.
- Add accessible labels.
- Provide tooltips if the design uses icon-only elements.

### Architecture

Create a reusable component and use the same implementation on both pages.

Do not duplicate the coding profiles UI.

---

## 10. Experience Page — Certifications Component

Add a Certifications component to the Experience page.

### Data requirements

- Inspect the existing data inside `data/prash`.
- Identify the existing certification information.
- Use the existing source of truth.
- If certification data already exists, render it without duplicating it.
- If the data exists but is not structured for the component, organize it appropriately within the existing data architecture.
- Do not invent certifications, credentials, issuing organizations, dates, credential IDs, or verification links.

### Design direction

Use a compact, editorial certification list.

Each certification entry should display available information:

- Certification name.
- Issuing organization.
- Date or year if available.
- Credential link if available.
- Supporting metadata if available.

### Layout

- Use a clean list, timeline, or grouped layout.
- Avoid large card grids.
- Use subtle separators.
- Keep the typography consistent with the Experience page.
- Ensure the component is responsive.

### Interaction

- Credential links should work.
- Hover and focus states should be subtle.
- If a certification has a verification link, provide a clear action to view the credential.
- Do not create nonfunctional buttons.

Integrate the component naturally into the Experience page layout.

---

## 11. Footer — Get My Card Hover Preview

Add a small card preview to the footer's Get My Card CTA.

### Behavior

- When the user hovers over Get My Card on desktop, display a compact preview of the actual personal card.
- Use the existing asset `public/user/personal/card.png`.
- The preview should be a floating popover, not a permanently visible image.
- Use a clean card-like frame.
- Preserve the original aspect ratio.
- Animate the preview with a subtle lift, tilt, or fade-in.
- Position it so it does not cover the CTA text or cause layout shifts.
- Close the preview when the pointer leaves or the user clicks outside.
- Provide an appropriate touch fallback for mobile, such as displaying the preview on tap or through a small preview affordance.
- Ensure the download action remains functional.

Do not use a fake preview or recreate the card from text.

---

## 12. Footer — Resume Hover Preview

Add a preview for the Get My Resume CTA if feasible.

The resume is expected to be hosted through Google Drive.

### Requirements

- Inspect the actual resume URL in the contact data.
- Determine whether the URL can be used to display a preview.
- If the Google Drive link supports previewing, display a compact floating preview on hover using an appropriate preview/embed URL.
- Do not expose or modify the resume URL incorrectly.
- Avoid requiring users to authenticate unnecessarily if the document is intended to be publicly accessible.
- Do not download the resume merely because the user hovers.
- Ensure the preview does not interfere with the resume download or opening action.

### Fallback

If a Google Drive preview cannot reliably be displayed due to permissions, embed restrictions, or URL format:

- Keep the CTA fully functional.
- Use a compact document-themed preview with an actual title or visual metadata where available.
- Do not display a fake document screenshot.
- Explain the limitation only if necessary.

The preview should be optional and should not compromise the primary resume action.

---

## 13. Workshop Details Page — Complete Workshop Information

The workshop details page currently may not display all the information available in the source data.

Ensure the workshop details page renders all relevant workshop details from:

`data/workshop/details.ts`

### Requirements

- Inspect the complete workshop data structure.
- Identify all available information for each workshop.
- Ensure relevant fields are displayed on the details page.
- Do not silently omit existing meaningful details.
- Do not invent missing information.
- Maintain an intentional layout and hierarchy rather than displaying raw object properties.
- Organize the information into appropriate sections.
- Preserve the existing workshop registration functionality.
- Ensure the page is responsive.
- Ensure the content is accessible and readable.

Display all relevant available details, such as descriptions, dates, location, topics, schedule, prerequisites, duration, seat information, or other fields if they exist in the source data.

Do not add sections for information that is absent.

The workshop details page should provide a complete overview of the workshop before the user registers.

---

## 14. Workshop Listing Cards — Display Seats and Date

The workshop cards on the listing page should display total seats and workshop date.

Use the source data in:

`data/workshop/details.ts`

### Requirements

- Display the workshop date in a clearly readable format.
- Display the total seat count (`totalSeats`) where available.
- Use the actual workshop values from the data.
- Do not hardcode seat counts or dates.
- Do not invent a remaining-seat count unless the data explicitly provides it.
- Do not interpret total seats as available seats.
- Ensure the date is formatted consistently across workshop cards.
- Use a compact layout that fits the card design.

### Design direction

Place date and seat metadata in a compact information row near the workshop title or card footer.

For example, the metadata row can include a date icon and a seat icon with their corresponding values.

Use small, understated icons.

Avoid overcrowding the workshop card.

Ensure metadata remains readable on mobile.

---

## 15. Data Architecture

Follow the existing data architecture.

- Read from `data/prash/about.ts` and `data/workshop/details.ts`.
- Use actual location coordinates.
- Use actual coding profiles.
- Use actual certifications where available.
- Use actual workshop dates and totalSeats.
- Do not hardcode data in UI components.
- Do not duplicate existing data.
- Extract shared utilities or components where appropriate.
- Maintain existing TypeScript types.
- Extend types only when necessary.
- Avoid unnecessary restructuring.

The UI should remain maintainable through data changes.

---

## 16. Styling and Interaction Consistency

- Follow the existing global design system.
- Use `app/globals.css` for shared styling tokens and global rules.
- Reuse existing components, animations, and interaction patterns.
- Keep the website minimalist.
- Use subtle motion and visual feedback.
- Avoid unnecessary gradients, glow, oversized cards, and decorative elements.
- Maintain consistent spacing, typography, color, borders, and transition behavior.
- Ensure all CTAs and buttons follow the assigned design tokens and variants.
- Avoid styling buttons through accidental text inheritance.

---

## 17. Responsive Design and Accessibility

Ensure the implementation works on desktop, tablet, and mobile.

- Navbar remains visible while scrolling.
- Project links wrap naturally on mobile.
- Workshop cards remain clickable without interfering with registration.
- Register buttons remain accessible and have sufficient contrast.
- Coding profiles adapt to smaller screens.
- Certifications remain readable.
- Footer map preview has a touch-accessible fallback.
- Card and resume previews do not obstruct content.
- Workshop details remain readable.
- No horizontal overflow.
- Use semantic elements.
- Provide keyboard navigation and focus states.
- Respect `prefers-reduced-motion`.
- Ensure popovers and previews are accessible.

---

## 18. Validation

After implementation, verify:

- RoleRotator displays the complete role text.
- Navbar remains visible during scrolling.
- Project links appear in a row and function correctly.
- Icon issue on `app/page.tsx` is resolved.
- Workshop cards are clickable.
- Register button on workshop cards functions correctly.
- Register button on workshop details has white text.
- Button styling has been audited for inheritance and contrast issues.
- Visit Me displays a real coordinate-based map preview.
- Visit Me opens Google Maps with the actual coordinates.
- Coding Profiles component appears above Latest Work on About.
- Coding Profiles appears in the top-right area of Experience.
- Certifications component appears on Experience.
- Footer card hover preview uses the actual image.
- Resume preview works where feasible.
- Workshop details display all relevant data from `data/workshop/details.ts`.
- Workshop cards display actual date and totalSeats.
- Existing workshop functionality remains intact.
- No broken links or missing assets.
- No horizontal overflow.
- No implementation-related console errors.

Run the available linting and build checks and fix errors caused by the implementation.

Do not claim checks were passed if they were not actually executed.

---

## 19. Implementation Instructions

This is an implementation task, not a planning or mockup task.

Inspect the relevant existing code and data structures. Implement the changes directly in the current codebase.

Do not rebuild the website.

Do not create placeholder content.

Do not introduce unnecessary dependencies.

Do not leave incomplete functionality.

Use design judgment for the final visual details, but follow the specified layouts and interaction behavior.

**The final experience should remain minimalist and cohesive, with thoughtful interactions, useful information, and refined visual details. Every feature must be functional, not merely decorative.**