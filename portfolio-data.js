/*
 * SINGLE PLACE TO EDIT YOUR DETAILS.
 * Both the website and the chatbot read from this file, so the chatbot
 * always answers using the same information shown on the page.
 *
 * Search this file for the word PLACEHOLDER and replace every one with your
 * real details (name, links, email, photo, project descriptions, etc.).
 */
const PORTFOLIO = {
  name: "JAY SRIVASTAVA",
  tagline: "Aspiring Developer | Python & Web Development | AI-Assisted Coding",
  intro:
    "PLACEHOLDER: Write 2-3 lines introducing yourself, e.g. who you are, what you study, and what you enjoy building.",
  photo: "assets/profile.svg", // replace with assets/profile.jpg (and update this line)
  about:
    "PLACEHOLDER: Write a short paragraph about yourself, your interests, and your goals. Mention that you used Cursor AI to build and debug your projects and that you can explain how they work.",
  education: [
    {
      title: "PLACEHOLDER Degree / Course Name",
      place: "PLACEHOLDER College / University Name",
      years: "PLACEHOLDER 20XX - 20XX",
    },
    {
      title: "Code With AI Course",
      place: "PLACEHOLDER Institute / Platform",
      years: "2026",
    },
  ],
  skills: {
    Languages: ["Python", "HTML", "CSS", "JavaScript"],
    "Tools & Platforms": ["Cursor AI", "Git", "GitHub", "Vercel"],
    Concepts: ["Debugging", "Prompt Engineering", "Responsive Design", "API Integration"],
  },
  contact: {
    email: "PLACEHOLDER your.email@example.com",
    github: "https://github.com/PLACEHOLDER-USERNAME",
    linkedin: "https://www.linkedin.com/in/PLACEHOLDER-USERNAME",
    location: "PLACEHOLDER City, Country",
  },
  projects: [
    {
      title: "Python Programs Collection",
      description:
        "A collection of Python programs: Factorial, Fibonacci, and Structure-to-Dictionary conversion, with an updated README in the repository.",
      details:
        "Factorial multiplies all whole numbers from 1 up to n. Fibonacci prints a sequence where each number is the sum of the previous two. Structure-to-Dictionary conversion turns structured data into a Python dictionary of key/value pairs. PLACEHOLDER: add any extra detail about how you wrote each program.",
      technologies: ["Python", "Markdown", "GitHub"],
      github: "https://github.com/PLACEHOLDER-USERNAME/python-programs",
      live: "",
    },
    {
      title: "Messy Python Code Improvement",
      description:
        "A messy, hard-to-read Python script that was cleaned up and improved using AI assistance.",
      details:
        "The original script had unclear names and poor structure. With AI assistance it was refactored for readability. PLACEHOLDER: list the exact improvements you made (renamed variables, added functions, comments, etc.).",
      technologies: ["Python", "Cursor AI", "Refactoring"],
      github: "https://github.com/PLACEHOLDER-USERNAME/messy-python-improvement",
      live: "",
    },
    {
      title: "Bug Fixing Using Cursor AI",
      description:
        "An incorrect (buggy) program that was identified and corrected using Cursor AI.",
      details:
        "PLACEHOLDER: explain what the bug was, how Cursor helped you find it, and exactly what was corrected in the code.",
      technologies: ["Python", "Cursor AI", "Debugging"],
      github: "https://github.com/PLACEHOLDER-USERNAME/bug-fixing-cursor",
      live: "",
    },
    {
      title: "Interactive Quiz Application",
      description:
        "A 5-question 'Code With AI' quiz built with HTML, CSS and JavaScript that tracks your score and shows the final result.",
      details:
        "Questions and options are stored in a JavaScript array. Each click calls checkAnswer(), which adds to the score if the choice is correct and moves to the next question. At the end it shows 'Your score is X out of 5'. Styled in a blue, white and gold theme.",
      technologies: ["HTML", "CSS", "JavaScript", "Quiz"],
      github: "https://github.com/PLACEHOLDER-USERNAME/quiz-app",
      live: "",
    },
    {
      title: "Book Reading List Application",
      description:
        "A reading list web app to keep track of books, with a README that includes the deployed link.",
      details:
        "PLACEHOLDER: explain how your reading list works (adding books, marking as read, removing, saving, etc.).",
      technologies: ["HTML", "CSS", "JavaScript", "Book", "Vercel"],
      github: "https://github.com/PLACEHOLDER-USERNAME/book-reading-list",
      live: "https://PLACEHOLDER-reading-list.vercel.app",
    },
  ],
};

// Lets the serverless chatbot function (Node) import this same file.
if (typeof module !== "undefined" && module.exports) {
  module.exports = PORTFOLIO;
}
