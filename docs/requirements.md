# Transform the Existing Workshop Website into a Personal Developer Portfolio

## 1. Objective

Transform the existing workshop website into a polished, interactive, minimalist personal portfolio website. This is not a redesign from scratch using a generic template. Reuse, adapt, and refactor the existing codebase, components, styling conventions, and structure wherever appropriate.

The website should represent me as a developer, showcase my projects, technical skills, experience, achievements, and workshops, and provide visitors with a compelling reason to explore my work, connect with me, or download my personal card.

The final experience should feel like a thoughtfully designed portfolio built by a developer with a strong sense of design, engineering, and attention to detail.

Do not simply replace the workshop website's text and call it a portfolio. Rework the overall website experience, layout, navigation, content presentation, interactions, and visual hierarchy.

---

## 2. Source of Truth and Data Management

All content and information about me is stored in `data/prash`.

All content and information related to my workshops is stored in `data/workshop`.

Treat these directories as the single source of truth for the website's content.

- Inspect all files inside `data/prash` and `data/workshop` before implementing the website.
- Understand the available information, existing data structures, images, links, projects, experience, skills, achievements, and workshop information.
- Do not invent personal information, project descriptions, achievements, dates, metrics, technologies, testimonials, or professional experiences.
- If a piece of content is missing, omit it rather than fabricate it.
- Do not hardcode content directly into page files, JSX components, or UI sections.
- If new content structures are needed, create or update the relevant files inside the appropriate `data` directory.
- Import data into components and render it dynamically.
- Keep content, presentation, and component logic separate.
- Do not duplicate the same content across multiple files unnecessarily.

The website must be maintainable by updating data files without needing to rewrite the UI.

---

## 3. Design Direction

Design a modern, minimalist developer portfolio with a premium editorial feel.

### Visual style

- Minimalist, clean, intentional and sophisticated.
- Strong typography with clear hierarchy.
- Generous whitespace without making the website feel empty.
- Restrained use of accent colors.
- Subtle borders, carefully selected shadows, and refined surface treatments.
- Avoid excessive gradients, glowing effects, random floating elements, excessive rounded cards, unnecessary badges, or generic SaaS-style layouts.
- Avoid making every section a grid of cards.
- Use different visual compositions for different sections while maintaining a consistent design system.
- Use the existing design conventions and styles in the project as the starting point. Refine them rather than introducing an unrelated design language.

The portfolio should feel personal, creative, technically sophisticated, and memorable.

### Typography

Create a consistent typography system with defined styles for:

- Hero heading.
- Section headings.
- Project titles.
- Body text.
- Supporting text.
- Navigation.
- Metadata and labels.

Use deliberate font sizing, line height, letter spacing, and responsive typography. Avoid default browser typography.

### Color system

Establish and maintain a cohesive color system using CSS variables in `app/globals.css`.

Define variables for:

- Background.
- Foreground.
- Primary accent.
- Secondary accent if necessary.
- Muted text.
- Surface.
- Border.
- Hover and interaction states.

Do not scatter hardcoded colors throughout component stylesheets.

---

## 4. Home Page

The home page should be the centerpiece of the portfolio and immediately communicate who I am, what I do, and what visitors can explore.

### Hero section

Create an engaging, minimalist hero section with:

- A clear introduction using information available in `data/prash`.
- A prominent headline describing my developer profile.
- A concise supporting description.
- A primary CTA leading to my projects.
- A secondary CTA for contacting me or viewing my other relevant profile, depending on available data.
- A visually prominent interactive 3D personal card.

The hero must have a strong visual hierarchy. Do not use generic text such as "Welcome to my portfolio" as the primary heading.

Use my actual profile information to construct the introduction.

### Interactive 3D personal card

Use the image `public/user/personal/card.png` as the source of the personal card.

Implement an interactive 3D card experience using the actual image. Do not recreate the card using HTML or replace it with a generic illustration.

The card should be presented as a physical object with depth and perspective.

#### Desktop interaction

- Display the card with a subtle initial tilt.
- Use pointer movement to dynamically rotate the card along its X and Y axes.
- The rotation should respond smoothly to pointer position.
- Apply perspective to make the card feel physically 3D.
- Add subtle depth through layered shadows.
- Include a restrained specular highlight or light reflection that responds to pointer movement, without obscuring the card's original design.
- Use smooth spring-like transitions when the pointer leaves the card.
- The card should return to its neutral position when the interaction ends.
- Avoid exaggerated rotations, aggressive scaling, or excessive glow.

#### Mobile interaction

- Ensure the card remains visually appealing on touch devices.
- Do not rely exclusively on hover or pointer interactions.
- Support a subtle touch interaction where feasible.
- Ensure the card does not interfere with scrolling or gestures.
- Use a reduced-motion or simpler interaction fallback for devices where appropriate.

#### Card actions

Provide an intuitive way to download the original personal card image.

- Add a visible but unobtrusive download action.
- The action must download the actual `public/user/personal/card.png` asset.
- Provide a tooltip or label explaining the action.
- Provide appropriate hover, pressed, and focus states.
- Ensure the action works on mobile as well.

The card itself should remain the focal point rather than the download button.

---

## 5. Portfolio Sections

Reorganize the website into a portfolio-focused experience. Use the content available in `data/prash` to determine which sections are populated and relevant.

Potential sections include:

- About & Education.
- Projects.
- Experience.
- Skills and technologies.
- Achievements.
- Workshops.
- Contact page with form.

Do not blindly create every section if the source data does not support it.

### Projects

Present projects as visually engaging, curated showcases rather than a generic list of cards.

- Use actual project data.
- Show relevant project names, descriptions, technologies, images, and links where available.
- Prioritize visual hierarchy and readability.
- Provide clear actions such as viewing the project, source code, or documentation where the links exist.
- Use different layout treatments where appropriate, such as featured projects and smaller project entries.
- Ensure that project actions are real and functional.
- Do not use fake project screenshots, metrics, links, or descriptions.

If the project data supports it, make one project visually prominent and use a different presentation for the remaining projects.

### Experience

Display professional experience in a clean timeline or editorial layout.

- Show role, organization, duration, and description based on available data.
- Use subtle timeline visuals where appropriate.
- Ensure that the layout is easy to scan.
- Avoid excessive decorative timeline elements.

### Skills

Show technologies and technical capabilities in a visually refined way.

- Group skills logically if the data supports categorization.
- Avoid giant collections of generic pill badges.
- Use clean typography, grouped lists, subtle visual emphasis, or other appropriate layouts.
- Do not add proficiency percentages or skill ratings unless they exist in the source data.

### Achievements

Show achievements in a compact but visually distinctive layout.

- Use the available achievement data.
- Make important achievements visually prominent.
- Avoid inventing statistics, awards, or rankings.

### Workshops

The website was originally a workshop website, and workshop-related functionality and data should not be discarded.

Workshop content is stored in `data/workshop`.

Preserve and adapt the existing workshop functionality and information into the portfolio.

The workshop application and related routes are located in `app/workshops`.

- Inspect the existing workshop implementation before making changes.
- Preserve functional workshop routes, content, and related functionality unless there is a clear reason to modify them.
- Integrate workshops into the portfolio's navigation and overall design.
- Make the workshop experience visually consistent with the new portfolio.
- Avoid breaking workshop pages or existing functionality during the transformation.

---

## 6. Navbar

Redesign the navbar to suit a personal portfolio.

### Layout

- Display a minimal personal branding element or logo on the left.
- Place navigation links on the right or in a layout that suits the existing design.
- Include links to the primary portfolio sections.
- Include a workshop navigation entry if the workshop section or route is available.
- Include a contact CTA if it fits the design.
- Ensure the navigation is responsive.

### Interactions

- Smooth hover transitions for navigation links.
- Subtle visual indication of the active section or route.
- Appropriate hover, focus, and pressed states.
- Smooth scroll to sections for same-page navigation.
- Proper navigation for separate routes.
- Avoid abrupt jumps when navigating between sections.
- Add a mobile navigation menu if necessary, with smooth opening and closing transitions.
- Ensure the mobile menu is accessible, keyboard navigable, and closes after selecting a destination.
- Prevent navigation elements from interfering with page scrolling.

The navbar should be visually restrained and should not dominate the page.

---

## 7. Footer

Redesign the footer to match the new portfolio.

Include relevant information available in the data:

- Personal branding or a short closing statement.
- Relevant social links.
- Email or contact link.
- Navigation links where useful.
- Copyright information.

### Interactions

- Subtle hover animations on links.
- Appropriate icon interactions if icons are used.
- A functional back-to-top action.
- Clear focus states.
- No dead links or placeholder buttons.

Keep the footer minimal, well-spaced, and visually connected to the rest of the page.

---

## 8. Micro-interactions and Motion

The entire website should feel responsive, alive, and polished, but motion must remain subtle and purposeful.

Implement micro-interactions across the website, including:

### Navigation

- Smooth hover transitions.
- Active section or route indication.
- Animated mobile menu transitions.

### Buttons and CTAs

- Subtle hover movement or elevation.
- Smooth color or border transitions.
- Pressed states.
- Focus states.
- Appropriate cursor feedback.

### Project and content elements

- Subtle image transitions.
- Controlled hover effects.
- Optional subtle reveal animations when entering the viewport.
- Do not make every element animate identically.

### Section transitions

- Use subtle reveal animations where they improve the experience.
- Avoid distracting entrance animations.
- Do not delay the visibility of important content unnecessarily.
- Avoid excessive scroll-triggered animations that make the site difficult to navigate.

### Tooltips and feedback

- Provide tooltips for icon-only controls.
- Provide feedback for download actions where appropriate.
- Provide meaningful feedback for interactive elements.
- Ensure that buttons and links communicate what they do.

### Motion quality

- Use smooth, consistent timing and easing.
- Avoid abrupt transitions.
- Avoid excessive bouncing, spinning, scaling, or flashing.
- Respect `prefers-reduced-motion`.
- Ensure animations do not negatively affect scrolling, readability, or accessibility.

---

## 9. Wow Moments and Exploratory Features

The portfolio should contain a few memorable interactions that encourage visitors to explore beyond the first screen.

Do not add gimmicks just for the sake of adding animations. Each experience should fit the portfolio and be implemented properly.

Prioritize the following:

### 3D personal card

The interactive card in the hero section is the primary interactive showcase. Make it feel tangible, polished, and responsive to user interaction.

### Project exploration

Make project exploration visually engaging through thoughtful layouts, image treatments, transitions, and interaction details.

### Scroll experience

Create a natural flow between sections with refined spacing, subtle visual continuity, and smooth navigation. Avoid making the page feel like disconnected blocks.

### Interactive details

Add small discovery moments where appropriate, such as subtle pointer-responsive effects, well-designed tooltips, interactive project previews, or carefully selected visual transitions.

Use your design judgment to implement a maximum of a few high-quality experiences rather than adding many unnecessary features.

---

## 10. Component Architecture

Use a component-based architecture throughout the website.

Do not build the entire website inside a single page file.

Whenever a section or feature has multiple related elements, create a dedicated component folder and keep its related implementation together.

Prefer structures such as:

- `components/Navbar/`
- `components/Footer/`
- `components/Hero/`
- `components/PersonalCard/`
- `components/Projects/`
- `components/Experience/`
- `components/Skills/`
- `components/Achievements/`
- `components/Workshops/`
- `components/Contact/`

Adapt the folder names and structure to the existing project conventions.

Each component folder should contain its related component files and styles or supporting logic where appropriate.

- Keep components focused on a single responsibility.
- Extract reusable UI and interaction logic into dedicated components or utilities.
- Avoid unnecessary abstractions.
- Avoid massive components with unrelated responsibilities.
- Avoid duplicating component logic.
- Use clear and consistent naming.
- Keep page files responsible for composition rather than containing the implementation of every section.
- Maintain the existing framework and architecture unless a change is genuinely required.

---

## 11. Styling and Global CSS

All styling must follow the existing project's styling approach, with the primary design system and shared styling rules defined in `app/globals.css`.

You may modify `app/globals.css` to establish or improve the design system.

Requirements:

- Centralize global typography, CSS variables, resets, shared layout rules, and design tokens.
- Use the global variables consistently across components.
- Ensure component styles are consistent with the global design system.
- Do not introduce a separate, conflicting styling system.
- Avoid unnecessarily scattered inline styles.
- Avoid arbitrary hardcoded color values in individual components.
- Maintain consistent spacing, sizing, typography, borders, and transitions.
- Follow the existing project conventions for component-level styles, whether CSS modules or another already established method.
- Do not introduce an entirely new styling framework unless the existing project already uses it or there is a compelling technical requirement.

The website should feel like one cohesive design, not a collection of independently styled components.

---

## 12. Responsive Design

The website must be fully responsive.

Test and refine the layout for:

- Large desktop screens.
- Standard desktop and laptop screens.
- Tablets.
- Mobile phones.

Requirements:

- Avoid horizontal overflow.
- Ensure typography scales appropriately.
- Adapt the hero layout for smaller screens.
- Ensure the 3D card fits properly on mobile.
- Make project layouts responsive.
- Make navigation usable on touch devices.
- Ensure buttons and interactive elements have sufficient touch targets.
- Maintain appropriate spacing on mobile.
- Ensure the footer and all sections remain usable.
- Do not simply shrink the desktop layout to fit mobile.

Mobile must feel intentionally designed.

---

## 13. Accessibility and Usability

Implement appropriate accessibility standards.

- Use semantic HTML.
- Ensure buttons are actual buttons and navigation links are actual links.
- Use meaningful alt text for images.
- Maintain sufficient contrast.
- Support keyboard navigation.
- Provide visible focus states.
- Ensure interactive components are accessible.
- Avoid hover-only functionality.
- Respect reduced-motion preferences.
- Ensure the 3D card does not interfere with accessibility or page interaction.
- Ensure navigation, download actions, and CTAs work with keyboard interaction.

---

## 14. Functionality and Quality Assurance

Do not focus only on visuals. The website must work end to end.

- Inspect the existing application before implementing changes.
- Understand existing routes and functionality.
- Preserve working features unless explicitly being redesigned or removed.
- Ensure every CTA has a functional destination or action.
- Ensure all links are valid based on available data.
- Ensure card downloads work.
- Ensure navigation works.
- Ensure mobile navigation works.
- Ensure workshop routes remain functional.
- Ensure scrolling and interactions work correctly.
- Ensure there are no broken imports or missing assets.
- Ensure there are no console errors.
- Ensure there are no obvious layout issues.

After implementation:

1. Run linting checks.
2. Run the build.
3. Fix errors caused by the implementation.
4. Test key routes and interactions.
5. Verify responsive behavior.
6. Verify that the workshop application still works.

Do not claim that a test passed if it was not actually run.

---

## 15. README

Update the existing `README.md` to reflect the transformed portfolio.

Include:

- Project overview.
- Updated application structure.
- Technologies used based on the actual project.
- Setup and installation instructions.
- Development instructions.
- Build instructions.
- Relevant route or section information.
- Explanation of the data directories, particularly `data/prash` and `data/workshop`.
- Any relevant implementation details for the interactive personal card or major features.

Do not unnecessarily rewrite unrelated documentation or remove useful existing information.

---

## 16. Implementation Approach

Before modifying files:

1. Inspect the entire existing project structure.
2. Inspect `data/prash`.
3. Inspect `data/workshop`.
4. Inspect the existing workshop application in `app/workshops`.
5. Inspect the current home page, navbar, footer, global stylesheet, and reusable components.
6. Identify the existing design conventions, libraries, dependencies, and architecture.
7. Determine which components can be reused and which need to be refactored.

Then implement the transformation systematically.

Do not stop after creating a plan or a mockup. Implement the complete website.

Do not create unnecessary dependencies. If a library is already available and appropriate, reuse it. If a dependency is genuinely needed for a specific feature, justify its use through the implementation and avoid adding unnecessary packages.

Do not leave unfinished components, placeholder content, TODOs for required functionality, dummy buttons, or incomplete interactions.

---

## 17. Definition of Done

The task is complete only when:

- The existing workshop website has been transformed into a portfolio website.
- The homepage has a compelling hero section.
- The actual personal card image is implemented as an interactive 3D experience.
- The card can be downloaded.
- Portfolio sections are populated from the data source.
- Workshop functionality and routes are preserved and integrated appropriately.
- Navbar and footer have been redesigned.
- Micro-interactions are implemented throughout the website.
- The website is responsive.
- Components are organized into dedicated folders.
- Content is not hardcoded inside page or UI components.
- Global styling is consistent and centralized through `app/globals.css`.
- The website has a few polished, memorable interactions.
- Accessibility and reduced-motion considerations are addressed.
- The README is updated.
- Linting and build checks have been run, and implementation-related errors have been fixed.

**Design and implementation quality matter equally. Do not settle for a generic portfolio template, a simple text replacement, or an unfinished visual redesign. Deliver a cohesive, functional, polished portfolio experience that feels intentional, distinctive, and worth exploring.**