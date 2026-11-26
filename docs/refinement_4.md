# Portfolio Enhancement — Theme Transition, Contextual Clock/Weather, Live Coding Metrics & CSS Cleanup

This is another implementation pass on the existing portfolio. The previous redesign and refinement tasks have already been completed. Modify the current codebase without rebuilding the website or disrupting existing functionality.

Maintain the existing visual direction: **minimalist, editorial, sophisticated, with subtle interactions and occasional visual drama**. New features must feel integrated into the current design rather than bolted on.

Inspect the existing code, components, data structures, styling, and dependencies before implementing.

---

# 1. Navbar — Animated Dark/Light Theme Button

Implement a dedicated circular theme-switching button in the navbar.

<text weight="medium" inline>Do not use a traditional toggle switch.</text> Use a circular icon button that changes its appearance based on the active theme.

### Placement

**Desktop:**
- Place the theme button on the right side of the navbar.
- Keep it aligned with the existing navbar content.
- Do not disrupt the existing navigation layout.

**Mobile and smaller screens:**
- Place the theme button immediately beside the mobile menu icon.
- Keep both icons aligned and properly spaced.
- Ensure the button does not overlap or disrupt the mobile menu.

### Button appearance

The button should be circular, compact, and visually refined.

**Light theme:**
- Use current theme.
- Display a warm yellow sun icon.
- Use a subtle border or shadow only if it fits the current design.

**Dark theme:**
- Use a dark surface that fits the dark theme.
- Display a moon icon.
- Maintain sufficient icon contrast.

Use an appropriate icon library already present in the project.

### Interaction

- Clicking the button toggles between light and dark themes.
- The icon should animate between the sun and moon.
- Use a subtle rotation, scale, or morph-like transition.
- Add a slight pressed-state animation.
- Add a tooltip such as "Switch to dark mode" or "Switch to light mode".
- Ensure the button works using keyboard interaction.
- Avoid a traditional switch/slider UI.

### Theme persistence

- Persist the user's selected theme across page navigation and reloads.
- Use the existing theme architecture if one already exists.
- Avoid introducing redundant theme state.
- Prevent the wrong theme from flashing during initial page load.
- If the project already uses a theme provider, extend it rather than creating another.

---

# 2. Dark/Light Theme — Dramatic but Smooth Transition

Changing the theme should not instantly flip every element from one color to another.

Create a smooth theme transition that feels like the new theme is sweeping across the page.

### Desired visual effect

When the user clicks the theme button:

- The selected theme updates.
- A circular reveal transition originates near the top-right corner of the viewport.
- The reveal expands diagonally toward the bottom-left, covering the page as the new theme appears.
- The transition should resemble a soft, expanding circular or radial reveal rather than a simple fade.
- The transition should feel fluid and intentional.

<text weight="medium" inline>Transition direction:</text> Top-right origin → expanding reveal toward the bottom-left.

### Implementation direction

Use a performant implementation such as the View Transition API with a circular clip-path reveal if supported, or a suitable CSS-based fallback.

The transition should:

- Cover the entire viewport.
- Transition between the existing theme and the new theme.
- Avoid visible flashing.
- Avoid blocking interaction for unnecessarily long durations.
- Be responsive.
- Work without requiring a page reload.
- Respect `prefers-reduced-motion`.

### Animation timing

- Use a smooth easing curve.
- Target approximately 500–800ms for the main reveal.
- Avoid overly slow or distracting animations.
- The theme button's icon animation should be coordinated with the theme reveal.

### Fallback

If the browser does not support the View Transition API:

- Switch themes using the existing theme mechanism.
- Use a shorter CSS transition on background, text, border, and surface colors.
- Ensure the fallback does not create layout shifts.

Do not animate every individual property unnecessarily. Prioritize the main theme surfaces and text colors.

---

# 3. Homepage — Contextual Clock, Weather & Playful Message

Add a small contextual widget to the homepage that uses my location and current local time to display the clock, weather, and a useful, playful, or witty contextual message.

The feature should feel like a small discovery on the portfolio, not a dashboard.

### Data source

Read the location coordinates from:

`data/prash/about.ts` → `contact` → `location` → `coordinates`

Use the actual latitude and longitude from the data.

Do not hardcode the location or coordinates in the component.

### Information to display

The widget should display:

- Current IST time for my `city: "Mumbai",`.
- Current weather condition.
- Current temperature in Celsius.
- A small weather icon.
- A contextual message based on time, weather, or both.

Examples of the tone of contextual messages:

- "Still awake? The commits aren't going to write themselves."
- "A little rain, a lot of debugging."
- "It's sunny out. Your browser tab disagrees with your priorities."
- "Coffee hours are in effect."
- "The weather's doing its thing. So are the builds."

These are tone examples only. Create a small, appropriate collection of playful messages, but do not make the widget repetitive, noisy, or distracting.

### Design direction

Create a compact widget that fits naturally into the homepage.

- Keep it minimalist.
- Use a small weather icon.
- Use clear typography for the clock.
- The time can be visually prominent, with weather details as supporting text.
- Keep the message short.
- Avoid a large dashboard/card layout.
- Prefer a compact inline composition or small editorial widget.
- Use subtle hover or reveal interactions.
- Ensure the widget does not compete with the hero headline.

### Clock behavior

- Display the current local time for the location stored in the data.
- Use the location's timezone, not the visitor's timezone.
- Update the displayed time periodically so it remains accurate.
- Use appropriate time formatting.
- Include a timezone-aware implementation.
- Do not derive the location's timezone from the visitor's browser.
- Determine the timezone based on the location data or a reliable timezone mapping for the coordinates.
- Do not hardcode an arbitrary timezone if it can be derived from the coordinates.

### Weather API

Use OpenWeatherMap's Current Weather API.

Endpoint:

`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric`

Replace `{lat}` and `{lon}` with the actual coordinates from the data.
Use `OPEN_WEATHER_API_KEY` from .env.
Use `units=metric`.

### API response fields to use

From the API response, use the following fields as appropriate:

| Response field | Usage |
|---|---|
| `name` | Location name |
| `weather[0].main` | Weather condition |
| `weather[0].description` | Human-readable weather description |
| `weather[0].icon` | Weather icon identifier |
| `main.temp` | Current temperature in Celsius |
| `main.feels_like` | Feels-like temperature, if needed |
| `main.humidity` | Optional additional weather information |
| `wind.speed` | Optional wind information |
| `sys.sunrise` | Sunrise time |
| `sys.sunset` | Sunset time |
| `timezone` | Location timezone offset in seconds from UTC |

Do not display every API field. Use only the information that makes the widget useful and visually clean.

### Weather icon

Use the icon identifier from `weather[0].icon`.

Use the OpenWeatherMap icon URL format:

`https://openweathermap.org/img/wn/{icon}@2x.png`

Do not hardcode individual weather icons for specific weather conditions if the API already provides the icon identifier.

### API key and security

- Use the existing configuration/environment variable architecture.
- Do not expose a secret API key directly in client-side source code.
- If the API key is private, fetch the weather through a server-side API route.
- Use a server-side endpoint or equivalent secure approach to retrieve weather data.
- Do not expose the API key in the browser.
- Avoid unnecessary additional dependencies.

### Timezone

The API's `timezone` field represents an offset in seconds, not an IANA timezone identifier.

For accurate location-based time, prefer deriving the IANA timezone from the coordinates using an appropriate existing library or reliable timezone mapping.

If the project already has a suitable dependency, reuse it.

If the API's timezone offset is used instead, ensure daylight-saving behavior is handled correctly where applicable and avoid treating a fixed offset as a permanently accurate timezone.

The clock should reflect the actual local time at my location.

### Fetching behavior

- Fetch weather when the widget initializes.
- Avoid unnecessary frequent weather API requests.
- Refresh weather at a reasonable interval, such as every 30 minutes.
- Use appropriate loading and error states.
- If the weather API fails, the clock should still function.
- If weather data is unavailable, show a graceful fallback instead of breaking the widget.
- Avoid excessive network requests.
- Consider caching weather data through the server-side endpoint.

### Contextual message logic

Create a small message-selection utility.

Use context such as:

- Local hour.
- Weather condition.
- Temperature.
- Time of day.

The message should feel natural and relevant.

For example:

- Early morning → morning-oriented message.
- Late night → playful late-night message.
- Rain → rain-related message.
- High temperature → heat-related message.
- Pleasant weather → light outdoor-related message.

Do not display a message that contradicts the actual weather or time.

Avoid repeatedly changing the message every minute. The message should remain stable during a reasonable period and change when the context meaningfully changes.

### Responsive behavior

- Ensure the widget is compact on mobile.
- Avoid overlapping the hero content.
- Avoid excessive text.
- Allow the supporting message to wrap naturally.
- Ensure no horizontal overflow.

---

# 4. Coding Profiles — Hover Metrics for Desktop Only

Enhance the existing Coding Profiles component so that coding platform metrics are revealed when the user hovers over a profile on desktop.

The existing component and its default appearance should remain intact.

### Desktop behavior

On sufficiently large screens, when the user hovers over a coding profile:

- Reveal additional profile metrics.
- Use a subtle transition.
- Keep the interaction compact and informative.
- Avoid turning the entire component into a large dashboard.
- Maintain the existing profile link and identity.
- Ensure the metrics do not make the component excessively large.

The metrics should be displayed in an appropriate hover panel, tooltip-like surface, or compact expanded profile state.

Use the platform-specific metrics available from the APIs described below.

### Small-screen behavior

On mobile and smaller screens:

- Keep the existing default Coding Profiles appearance.
- Do not reveal metrics through hover behavior.
- Do not fetch coding profile metrics.
- Do not send requests to the metrics APIs.
- Do not create unnecessary network calls.

The existing component should remain functional and compact.

### Fetching restrictions

<text weight="medium" inline>Critical requirement:</text> Coding metrics must only be fetched when the viewport qualifies as desktop or sufficiently large.

Client-Side Fetching with window.matchMedia (Recommended)
Using window.matchMedia is cleaner and more performant than listening to raw resize events because it only fires when the screen crosses a specific breakpoint rather than on every pixel change.

- Detect the viewport using an appropriate responsive mechanism.
- Do not fetch metrics on mobile.
- Do not fetch metrics merely because the component is rendered.
- Fetch only when the desktop condition is satisfied.
- Use the fetched metrics for hover presentation.
- If the API fails, retain the default profile display.
- Do not break profile links or the component when metrics are unavailable.
- Avoid duplicate API requests.
- Cache or reuse fetched results where appropriate.
- Do not send repeated requests for every hover.
- Do not refetch metrics on every mouse movement.
- Avoid unnecessary requests when the user navigates between pages where the component is reused.

The default coding profile links should always remain visible and functional regardless of API availability.

### API 1 — Coding Profile Stats

Use:

`GET https://coding-profile-service-v2-0.onrender.com/stats?leetcode=prashantg-0&codechef=prashantg_0&gfg=mailprasu0t8&hackerrank=mail_prashantg0`

The API returns a `profiles` array.

Each profile contains a `platform` field identifying the platform.

Use the following response fields where available:

| Platform | Metrics |
|---|---|
| HackerRank | `totalSolved`, `badges` |
| CodeChef | `totalSolved`, `contestsParticipated`, `maxRating`, `stars` |
| LeetCode | `totalSolved`, `easySolved`, `mediumSolved`, `hardSolved`, `contestsParticipated`, `maxRating` |
| GeeksforGeeks | `totalSolved`, `easySolved`, `mediumSolved`, `hardSolved` |

### Platform-specific metric presentation

**LeetCode:**

Display a compact subset:

- Total solved.
- Easy/Medium/Hard solved breakdown.
- Contest rating.
- Contests participated, if available.

Prioritize solved count and rating. Avoid displaying every field if the layout becomes cluttered.

**CodeChef:**

Display:

- Total solved.
- Highest rating (`maxRating`).
- Contest participation.
- Star count, if available.

**GeeksforGeeks:**

Display:

- Total solved.
- Easy/Medium/Hard breakdown, if available.

**HackerRank:**

Display:

- Total solved.
- Badges, using a compact presentation.

Do not display unavailable metrics.

### API handling

- Validate the response shape.
- Handle loading, error, and empty states.
- Do not display misleading or fabricated metrics.
- If the API fails, show the existing default profile UI.
- If a particular profile is missing from the response, only show metrics for the profiles successfully returned.
- Do not break the coding profile links.

### Hover behavior

- Trigger metric presentation on hover only on desktop.
- Ensure the expanded content can be read without flickering.
- Do not make the hover state disappear when the pointer moves from the profile trigger to its expanded panel.
- Use appropriate positioning.
- Avoid clipping due to parent overflow.
- Support keyboard focus as an equivalent interaction on desktop.
- Provide a subtle entrance animation.
- Respect reduced-motion preferences.

---

# 5. GitHub — Live Profile Metrics

Use the GitHub public profile API:

`GET https://api.github.com/users/prashant-g0`

### Response fields

Use the following fields where relevant:

| Field | Usage |
|---|---|
| `login` | GitHub username |
| `name` | Profile name |
| `avatar_url` | Optional avatar |
| `html_url` | Profile URL |
| `public_repos` | Public repository count |
| `followers` | Followers |
| `following` | Following |
| `updated_at` | Profile update metadata, only if useful |

### Display

On GitHub hover show a small profile card using available data

Use a compact presentation consistent with the other coding profiles.

Do not display irrelevant fields such as API URLs or internal identifiers.

### Fetching

- Fetch GitHub metrics under the same desktop-only restrictions as the other coding profile metrics.
- Do not fetch on mobile.
- Avoid repeated calls.
- Cache/reuse the result.
- Handle API errors gracefully.
- Preserve the default GitHub profile link and UI.

GitHub's public API should be used without exposing unnecessary credentials.

Do not introduce a GitHub API token for this feature unless there is an existing justified integration requiring it.

---

# 6. Coding Metrics — Architecture and Performance

Implement the metrics feature with a maintainable architecture.

### Requirements

- Keep the Coding Profiles component reusable.
- Separate API fetching logic from UI presentation.
- Use appropriate TypeScript interfaces for the responses.
- Avoid duplicating fetching logic.
- Avoid unnecessary client-side dependencies.
- Avoid redundant state.
- Do not fetch metrics on small screens.
- Do not fetch on hover.
- Do not fetch separately for every profile.
- Fetch once when desktop eligibility is established.
- Reuse cached data if the component is mounted again.
- If fetching fails, keep the existing UI fully functional.

### Desktop eligibility

Use a breakpoint appropriate for the existing design, such as the project's desktop breakpoint or a minimum viewport width of approximately 1024px.

The actual breakpoint should match the existing responsive design system.

The feature should not treat a tablet or narrow laptop as desktop merely because it has a mouse unless the design breakpoint supports it.

Use a responsive media-query check rather than assuming device type.

### Loading behavior

If metrics are loading:

- Keep the default profile component visible.
- Do not replace the profile links with a loading screen.
- Use subtle loading feedback only within the metric reveal area.
- Do not make the component jump in size unnecessarily.

### Failure behavior

If an API fails:

- Keep the default component.
- Do not display error banners that clutter the portfolio.
- Do not retry excessively.
- Avoid broken hover panels.

---

# 7. Global CSS — Remove Unnecessary Duplication

Clean up `app/globals.css` to reduce redundancy and improve maintainability.

The stylesheet currently may repeat entire selectors or unnecessarily re-declare base properties within media queries.

### Requirements

- Inspect the entire stylesheet.
- Identify duplicated selectors and properties.
- Consolidate repeated styles where appropriate.
- Keep base styles together.
- Within media queries, only override properties that actually change.
- Do not repeat entire selectors and their base properties unnecessarily.
- Remove redundant declarations.
- Consolidate repeated color, spacing, typography, transition, and layout rules into existing tokens or shared rules where appropriate.
- Preserve existing visual behavior.
- Avoid broad refactoring that changes the design unintentionally.
- Do not delete styles that are needed for a specific responsive behavior.
- Ensure media-query overrides remain readable and maintainable.
- Maintain the current styling architecture.

### Example of the intended cleanup

Instead of duplicating the entire selector:

```css
.hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 4rem;
}

@media (max-width: 768px) {
  .hero {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 2rem;
  }
}
```

Keep the base styles intact and only override changed values:

```css
.hero {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 4rem;
}

@media (max-width: 768px) {
  .hero {
    gap: 1rem;
    padding: 2rem;
  }
}
```

This is the principle to follow throughout the stylesheet.

Do not blindly apply this example to unrelated selectors; inspect the actual CSS and make targeted changes.

---

# 8. Lazy Loading — Audit Existing Implementation

Lazy loading has not been implemented.

Audit the existing implementation and introduce a lazy-loading system.

### Requirements

- Ensure that images use appropriate loading strategies.
- Ensure below-the-fold content is loaded efficiently.
- Ensure critical hero assets are not unnecessarily delayed.
- Avoid lazy loading elements that should be immediately available.
- Ensure lazy loading does not interfere with animations or layout stability.
- Avoid duplicate lazy-loading implementations.
- Preserve existing behavior unless an actual issue is identified.

Do not unnecessarily refactor the lazy-loading system if it is already working correctly.

---

# 9. Styling, Accessibility and Interaction Consistency

All new features must follow the existing design system.

- Reuse existing global CSS tokens and component conventions.
- Keep the portfolio minimalist.
- Use subtle hover, focus, pressed, and loading states.
- Avoid excessive gradients, glow, and decorative elements.
- Ensure theme button contrast in both themes.
- Ensure weather information is readable.
- Ensure metric popovers are accessible.
- Ensure hover interactions have keyboard equivalents where appropriate.
- Respect `prefers-reduced-motion`.
- Avoid horizontal overflow.
- Ensure responsive layouts work on mobile, tablet, and desktop.
- Avoid unnecessary dependencies.

---

# 10. Validation and Testing

After implementation, verify the following.

### Theme

- Theme button is circular and not a toggle switch.
- Sun icon appears in light theme.
- Moon icon appears in dark theme.
- Button placement is correct on desktop and mobile.
- Theme persists across reloads.
- No initial theme flash occurs.
- Theme reveal expands from the top-right toward the bottom-left.
- Fallback works without the View Transition API.
- Reduced-motion behavior is respected.

### Clock and Weather

- Location coordinates are read from the data.
- Clock displays the correct local time.
- Clock updates periodically.
- Weather API is configured securely.
- Temperature and condition display correctly.
- Weather icon is rendered correctly.
- Contextual message is appropriate.
- Weather failure does not break the clock.
- API requests are not unnecessarily frequent.

### Coding Profiles

- Default profiles remain visible.
- Desktop metrics fetch only when desktop eligibility is established.
- Mobile does not fetch metrics.
- API requests are not repeated unnecessarily.
- Metrics correspond to the correct platform.
- GitHub metrics are displayed correctly.
- Hover/focus reveals metrics.
- API failure preserves the default profile UI.
- Missing profile data does not break the component.

### CSS

- Redundant global CSS has been cleaned up.
- Media queries only override changed properties where possible.
- Base styles remain consolidated.
- Visual behavior has not regressed.

### Lazy Loading

- The lazy loading remains functional.
- Critical content is not unnecessarily delayed.
- No duplicate lazy-loading mechanism has been introduced.

### General

- No broken links or assets.
- No console errors caused by the implementation.
- No horizontal overflow.
- Existing functionality remains intact.
- Run available linting and build checks.
- Fix errors introduced by the changes.

Do not claim testing was completed if the checks were not actually run.

---

# 11. Implementation Instructions

This is an implementation task.

Inspect the existing codebase, components, CSS, API architecture, and data before making changes.

Implement the features directly.

Do not rebuild the portfolio.

Do not create placeholder metrics or weather information.

Do not hardcode location coordinates.

Do not expose API keys.

Do not introduce unnecessary dependencies.

Do not fetch coding metrics on mobile.

Do not leave incomplete features.

Use design judgment for the final visual details, but follow the functional requirements specified above.

**The result should feel like a thoughtful, living portfolio: the theme transition should feel tactile, the homepage should feel connected to its location and time, and coding profiles should reveal real progress only when the visitor chooses to explore.**