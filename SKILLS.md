# SKILLS.md

## Purpose

Use these project-local skills for frontend screen work in `chat-ui`. They define how agents should approach common UI tasks without crossing into backend implementation.

## Skill: Screen Implementation

Use when creating or changing a route-level page or major screen.

Process:

1. Identify the user flow, entry point, and route or screen owner.
2. List required UI states: loading, empty, error, disconnected, authenticated, unauthenticated, and success.
3. Implement the smallest route-level wrapper needed.
4. Move reusable visual pieces into components.
5. Add responsive behavior for mobile and desktop.
6. Verify the changed screen in the browser when a dev server is available.

Done when:

- The screen is reachable through the expected route or navigation path.
- Main states are represented.
- The layout is stable across mobile and desktop widths.

## Skill: Chat UI Components

Use when building room lists, message lists, composers, avatars, unread badges, presence indicators, tabs, drawers, modals, or toolbars.

Rules:

- Keep components focused on rendering and interaction.
- Pass normalized props into components instead of raw backend payloads.
- Use stable dimensions for avatars, badges, icon buttons, message rows, and list items.
- Preserve keyboard access for menus, dialogs, tabs, and composer actions.
- Avoid putting business protocol logic inside presentational components.

Done when:

- Component props are typed when TypeScript is available.
- Empty and long-content cases are handled.
- Hover, active, focus, disabled, and loading states are covered where relevant.

## Skill: API And Socket Boundary

Use when the screen needs server data, WebSocket events, or mocked backend behavior.

Rules:

- Keep HTTP and WebSocket code in a dedicated client, service, adapter, or hook.
- Map backend DTOs to frontend view models at the boundary.
- Document temporary assumptions for missing backend contracts.
- Use mocks for frontend-only development instead of implementing backend behavior.
- Never add Netty server code in this repository.

Done when:

- UI components consume frontend-friendly models.
- Backend payload assumptions are isolated and easy to replace.
- Mock data can be removed without changing presentational components.

## Skill: Visual QA

Use before finishing meaningful UI changes.

Checklist:

- Run available format, lint, typecheck, and test scripts.
- Start the dev server when available.
- Inspect changed screens at desktop and mobile widths.
- Check for text overflow, overlapping controls, broken focus styles, missing images/icons, and console errors.
- Exercise critical interactions such as opening rooms, composing messages, sending, retrying, filtering, switching tabs, and reconnecting states when applicable.

Done when:

- Verification commands pass, or failures are reported with the relevant cause.
- Browser inspection confirms the changed screen is usable.

## Skill: Frontend Scaffold

Use only when the repository has no existing frontend framework and the task requires creating one.

Default choice if no stack is specified:

- Vite
- React
- TypeScript
- A lightweight test setup appropriate to the scaffold

Rules:

- Keep the first scaffold minimal and app-focused.
- Create the actual chat UI shell, not a marketing landing page.
- Include a mock data layer so screens can be developed without the backend.
- Add scripts for dev, build, lint, typecheck, and test when feasible.

Done when:

- The app starts locally.
- The first screen renders a usable chat-oriented interface.
- Future backend integration points are isolated.
