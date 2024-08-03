# React/Angular Todo and Currency Converter App

This project is a web application built using [React](https://reactjs.org/) with TypeScript or [Angular](https://angular.io/), featuring two main components: a todo list and a currency converter. The app includes routing, dark/light theme toggling, and basic data persistence in the browser.

## Features

### Todo Component

- **Create New Todo Task**: Allows users to add new tasks.
- **Task Filters**: Tabs to filter tasks by status: All, Pending, or Completed.
- **Quick Add**: Pressing 'Enter' from the textbox adds a new task.
- **Input Validation**: Basic validation ensures meaningful input.

### Currency Converter

- **API Integration**: Utilizes the free and open [Exchange Rates API](https://open.er-api.com/v6/latest) for currency data.
- **Editable Inputs**: Allows users to enter any positive numbers for conversion.
- **Add New Comparison**: A button opens a modal to select source and target currencies for comparison.
- **Responsive Design**: Cards adjust to smaller viewports for better mobile experience.

### Global Features

- **Navigation**: Includes navigation links to switch between the Todo and Currency Converter pages.
- **Dark/Light Theme Toggle**: A button in the navigation bar toggles between dark and light themes.
- **Data Persistence**: All data is stored locally in the browser, ensuring it persists between sessions.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pratrock/Projects.git
   cd currency_conv_todo_list
   ```
