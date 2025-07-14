# Aleph Alpha Frontend Challenge

## Getting Started

### Prerequisites

Ensure you have [pnpm](https://pnpm.io/) installed as it is the package manager used in this project.

### Project Setup

1. **Unzip the Package and Navigate to the Project Directory:**


   ```bash
    cd aleph-alpha-frontend-challenge
    ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the Development Server:**

   ```bash
   pnpm dev
   ```

4. **Run the Tests:**

   ```bash
   pnpm test
   ```

## Tech Stack

The project is built with the following technologies:

- **Language:** TypeScript
- **Framework:** Vue 3
- **State Management:** Pinia
- **Build Tool:** Vite
- **CSS Framework:** Unocss
- **Linter:** ESLint
- **Formatter:** Prettier

### Testing Tools

- **Test Runner:** Vitest
- **Component Testing:** Testing Library for Vue
- **User Event Simulation:** Testing Library User Events

## Challenge Overview

### Problem Statement

During the live coding challenge, your primary objective is to implement at least three of the following features:

1. **Display a List of Pending Items:**  
   Create a section in the UI that lists all items that are yet to be completed. This list should be dynamically updated as new items are added or existing items are marked as complete.

2. **Display a List of Completed Items:**  
   Implement functionality to show a separate list of items that have been marked as complete. Ensure that this list accurately reflects the current state of the items, moving items from pending to completed as necessary.

3. **Add New Items to the List:**  
   Provide an interface that allows users to add new tasks or items to the pending list. This should include form validation and ensure that new items are properly integrated into the existing list.

4. **Edit Existing Items:**  
   Allow users to edit the details of any existing item. This feature should enable users to update the text or other properties of the items, ensuring the changes are reflected immediately in the UI.

5. **Remove Items from the List:**  
   Implement the ability to delete items from either the pending or completed list.

6. **Mark Items as Complete:**  
   Add functionality to toggle the completion status of items. When an item is marked as complete, it should move from the pending list to the completed list.

### Evaluation Criteria

You will have **40 minutes** to complete the challenge. Your goal is to implement as many of the features listed above as possible, focusing on functionality, code quality, and efficient use of time. You are encouraged to make any changes to the existing codebase, including altering the architecture or design. There is no specific visual requirement, so you have the freedom to style the application as you see fit.

### Final Note

The main goal of this challenge is to see how well we can collaborate during a pair programming session. It’s an opportunity for us to explore how you approach problem-solving and coding in real-time. We’re excited to work with you and wish you the best of luck!