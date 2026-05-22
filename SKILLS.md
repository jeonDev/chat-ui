# SKILLS.md

## Purpose

These skills guide the agent through the **Planner -> Developer -> Reviewer** workflow for modular frontend development in `chat-ui`.

## Skill: Planning (Planner Phase)

Use this at the start of any task to define the scope and design.

Steps:
1.  **Requirements Analysis:** Identify the user goal and entry points.
2.  **State Mapping:** List all UI states (Idle, Loading, Success, Empty, Error, Disconnected).
3.  **Domain Modeling:** Define the data structures and API/Socket contracts.
4.  **Component Design:** Map out the hierarchy of components, ensuring each has a single responsibility.
5.  **Task Breakdown:** Split the implementation into small, manageable developer tasks.

## Skill: Modular Implementation (Developer Phase)

Use when writing code, focusing on separation of concerns and conciseness.

Rules:
- **Feature Isolation:** Keep logic and UI within `src/features/[domain]`.
- **Atomic Components:** Split UI into the smallest possible reusable pieces.
- **Concise Logic:** Extract complex logic into custom hooks within the feature folder.
- **Boundary Management:** Ensure API/Socket interaction is handled in `src/api` or feature-specific adapters.
- **File Length:** Strictly monitor file length (< 150 lines).

## Skill: Visual & Quality QA (Reviewer Phase)

Use to verify the implementation before completion.

Checklist:
1.  **Structural Audit:** Does the directory follow the Role/Domain pattern? Are files concise?
2.  **Visual Audit:** Check mobile/desktop layouts, focus states, and text overflows.
3.  **State Audit:** Verify all planned UI states (Loading, Error, etc.) render correctly.
4.  **Functional Audit:** Test core interactions (send, click, navigate).
5.  **Technical Audit:** Run lint, typecheck, and tests. Ensure no console errors.

## Skill: API And Socket Boundary

(Keep the existing focus on DTO mapping and mock isolation, but integrate with the Domain structure.)

Rules:
- Map backend DTOs to frontend view models in `src/api` or feature-specific adapters.
- Use mock data in `src/mocks` for development.
- Ensure the UI only consumes clean, frontend-ready models.
