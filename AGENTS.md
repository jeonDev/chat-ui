# AGENTS.md

## Project Scope

This repository is the frontend-only workspace for `netty-chat`.

## Multi-Phase Workflow

Every task must proceed through these three distinct phases to ensure quality and modularity:

1.  **Planner (기획자 Phase):**
    *   Define the user requirements and UI states (loading, empty, error, etc.).
    *   Define the domain models and API/Socket contracts.
    *   Design the component hierarchy before implementation.
2.  **Developer (개발자 Phase):**
    *   Implement modular code following the "Domain-Feature" structure.
    *   Extract components aggressively to keep files concise.
    *   Ensure type safety and follow styling conventions.
3.  **Reviewer (리뷰어 Phase):**
    *   Perform Visual QA across different screen widths.
    *   Verify file structure and adherence to the "concise file" rule.
    *   Run tests and linting to ensure zero regression.

## Directory Structure & Package Separation

Organize code by **Role** and **Domain** to maintain scalability:

- `src/api`: Low-level HTTP/WebSocket clients and DTO definitions.
- `src/core`: Cross-cutting concerns (common hooks, providers, constants, utils).
- `src/components`: Shared UI primitives (Button, Input, Avatar, Modal). No business logic.
- `src/features`: **Domain-based modules.** Each folder contains its own components, hooks, and state.
    - `src/features/auth`: Login, Join, Token management.
    - `src/features/chat`: Message list, Message composer, Message logic.
    - `src/features/room`: Room list, Room creation, Room settings.
- `src/pages`: Route-level orchestration. Thin layers that compose features.
- `src/assets`: Static assets like images and global styles.

## Naming Conventions

- **Filenames:** Use **PascalCase** for most files (e.g., `LoginPage.js`, `AuthApi.js`, `UseChatSocket.js`). `index.js` and `index.css` remain lowercase.
- **Directories:** Use **kebab-case** for folder names.
- **Components & Contexts:** Use **PascalCase** (e.g., `const ChatRoom = ...`).
- **Variables, Functions, Props, & Hooks:** Use **camelCase** (e.g., `const [user, setUser] = ...`, `const useChat = ...`).
- **CSS Classes:** Use **kebab-case** (e.g., `.chat-container`).

## Coding Standards

- **Concise Files:** Aim for under **150 lines** per file. If a file grows too large, split it into sub-components or extract logic into a custom hook.
- **Aggressive Componentization:** If a piece of UI is repeated or has its own internal state/logic, it MUST be a separate component.
- **Domain Isolation:** Features should not deeply depend on other features. Use `src/core` or `src/components` for shared elements.
- **State Management:** Use local state or feature-specific hooks first. Only move to global state if truly necessary for cross-domain communication.
