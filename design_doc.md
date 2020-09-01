# Design Document

## Front-End

Technologies:

(JavaScript)

- React
- Redux
- Firebase Authentication
- Emotion

## Back-End

Technologies:

(Python)

- Django
- SQLite3
- Firebase Admin SDK
- Cron

## Hosting

Technologies:

- VPS
- Linux
- Nginx
- CI/CD

## Future Considerations:

- Email service
- Abstracting away websites to scrape

### Database Schemas

Habit Tracker

- Todos

  - ID (required, unique, number)
  - Name (required, string)
  - Description (optional, string)
  - Date Created (required, datetime)
  - Date Finished (optional, datetime)
  - Finished (required, boolean)
  - Order? Priority? (required, unique)
  - User UID (required, foreign key, string)

- Habits

  - ID (required, unique, primary key, number)
  - Name (required, string)
  - Description (optional, string)
  - Date Created (required, datetime)
  - Order? Priority? (required, unique)
  - User UID (required, foreign key, string)

- Daily Habits

  - ID (required, string)
  - Date (required, datetime)
  - Habits ID (required, foreign key, number)
  - Finished (required, boolean)
  - User UID (required, foreign key, string)

Post Saver

- Posts (Reddit, Websites)

  - ID (required, unique, primary key, number)
  - Reddit ID (optional, unique, string)
  - Title (required, unique, string)
  - URL (required, string)

- Titles

  - ID (required, unique, number)
  - Title (required, unique, string)
  - User UID (required, foreign key, string)

- Saved Posts

  - ID (required, number)
  - Post ID (required, foreign key, number)
  - Seen (required, boolean)
  - User UID (required, foreign key, string)

Users

- Users

  - ID (required, unique, number)
  - UID (required, unique, primary key, string)
  - Services (required, foreign key)

Services

- Services

  - ID (required, unique, number)
  - Type (required, unique, string)

# User Actions

Habit Tracker

- Todos

  - Add todos
  - Edit todos
  - Delete todos
  - Finish todos
  - Unfinish todos
  - Order todos (up, down, drag up and down)
  - Prioritize todos (separate from ordering todos)

- Habits

  - Add habits
  - Edit habits
  - Delete habits
  - Finish todos
  - Unfinish todos
  - Order habits (up, down, drag up and down)

- Daily Habits

  - Show habits for week, month, and year view

Post Saver

- Posts (Reddit, Websites)

  - View current posts
  - Refresh current posts
    - Cross out seen posts

- Titles

  - Add titles
  - Edit titles
  - Delete titles
  - Search titles
  - Sort titles

- Saved Posts

  - Read posts
  - Refresh saved posts

Users

- Users

  - Delete account
  - Add services
  - Delete services
