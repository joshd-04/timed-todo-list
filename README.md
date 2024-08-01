# Timed Todo list

Add your tasks, give yourself a time limit, and start being productive!

## About

In this mini-web app you can create tasks by clicking the '+ NEW' button which opens a form, which has input validaiton
![Image showing task creation with validation](./readme%20assets/task-creation.PNG)

Any existing tasks can be accessed via the side panel which shows a brief overview of the task, with status information in a shaded box
![Side panel containing one task](./readme%20assets/side-panel.PNG)

You can view detailed info about tasks when you click on it, status info is at the top with the consistent shaded box.
There are buttons to start, reset, delete the task.
![A task that hasn't been started yet](./readme%20assets/task-not-started.PNG)

When you start a task,

- the status changes + you have an option to pause
- paused tasks have a paused status + a button to resume
- the reset button becomes active
  ![A task in progress](./readme%20assets/task-in-progress.PNG)

There is also a light/dark theme toggle, and all data is saved to local storage (including tasks and theme). Any tasks in progress are automatically paused.
![Light theme preview](./readme%20assets/light-theme.PNG)

## Tech stack

This project was made using React (via Vite and the `create vite@latest` command), TypeScript, React Router and CSS.

and yes, i did count: this project has around 1.4k lines of code 💥

## How to set up

1. Download the project code (.zip) and extract it into a project folder
2. Open your terminal and navigate to the project folder
3. Run `npm install`
4. Run `npm run dev` to start a live development server
5. Click the link outputted in the terminal. It should be http://localhost:5173/ (that's what mine was) - and voilá! it should be working 🤞

# Thanks for reading 😃
