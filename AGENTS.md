# AGENTS.md

## Project Scope

This repository is the frontend-only workspace for `netty-chat`.

Agents working here must focus on browser UI, screen flows, frontend state, styling, accessibility, frontend tests, and API integration boundaries. Do not implement or modify backend Netty server behavior in this repository.

## Primary Goal

Build and maintain the chat product screens as a production frontend:

- Chat room list and navigation
- Login, join, and user/session screens
- One-to-one and group chat screens
- Message composer, message history, unread state, and typing/presence UI
- Connection state, reconnecting, loading, empty, and error states
- Responsive desktop and mobile layouts

## Working Rules

- Treat backend behavior as an external contract. If an endpoint, WebSocket event, or payload shape is unclear, document the assumption near the frontend adapter or mock.
- Keep backend-facing code isolated behind typed API clients, socket clients, adapters, or mocks.
- Do not add server-side Netty code, database code, or backend domain logic here.
- Prefer existing project patterns once source files exist. Do not introduce a new framework or design system unless the repository has no established direction and the task requires it.
- Keep edits scoped to the screen, component, route, state module, or test directly related to the request.
- Use ASCII by default for code and config. Korean UI copy is acceptable where product text requires it.

## Frontend Quality Bar

- Every screen must handle loading, empty, error, disconnected, and success states when those states can occur.
- Interactive controls must be keyboard accessible and have clear focus states.
- Text must not overflow, overlap, or become unreadable on mobile and desktop.
- Use stable dimensions for repeated UI elements such as message rows, room list items, avatars, counters, tabs, and icon buttons.
- Use icons for common actions when the project has an icon library available.
- Avoid marketing-style landing pages unless explicitly requested. The first screen should be the actual chat experience or auth flow.
- Keep visual styling restrained and application-focused: dense enough for repeated use, but not cluttered.

## Implementation Preferences

- Use TypeScript for application code when available.
- Prefer component composition over large screen files.
- Keep route-level screens thin: orchestration, layout, and data binding belong there; reusable UI belongs in components.
- Keep protocol and DTO mapping at the API/socket boundary, not spread through UI components.
- Prefer declarative state management already present in the project. If none exists, start with local state and small hooks before adding a global store.
- Use CSS modules, scoped styles, utility classes, or the existing styling approach. Do not mix styling systems without a clear reason.

## Verification

Before finishing frontend changes:

- Run the relevant formatter, linter, typecheck, and tests when scripts exist.
- Start the local dev server for app-level UI changes when feasible.
- Verify changed screens in a browser at desktop and mobile widths.
- Check that key states render without layout overlap or console errors.

If a verification step cannot run because the project is not scaffolded yet or scripts are missing, state that clearly in the final response.

## File Ownership

Expected frontend areas once the app is scaffolded:

- `src/screens` or `src/pages`: route-level screens
- `src/components`: reusable UI
- `src/features`: chat-specific feature modules
- `src/api` or `src/services`: HTTP clients, WebSocket clients, and DTO mapping
- `src/hooks`: shared frontend hooks
- `src/styles`: global tokens and shared styles
- `src/mocks`: mocked API/socket data for frontend-only development
- `src/test` or colocated `*.test.*`: frontend tests

Adjust these paths to the framework's actual structure once source files exist.
