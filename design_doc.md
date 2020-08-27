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

- Users

  - ID (required, unique, number)
  - UID (required, unique, primary key, string)
