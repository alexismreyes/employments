## gigranger.com - A Employment Platform🧑‍💼

A full-featured job portal application that allows recruiters to post and manage job listings, and job seekers to find, apply, and track job applications, it also allows chat communication between them. This project showcases real-world features such as authentication, role-based access, file uploads, filtering, email notifications, and application history tracking — built with production-ready technologies.

## 📌 Disclaimer

This app began as a personal initiative to practice and explore full-stack development concepts using modern tools like React, Node.js, MySQL, and AWS. While it may not follow a single strict standard across all components — for instance, some forms use Dialogs while others use Formik, and error handling varies between Axios responses and `console.error` — this was intentional.

The goal has always been to build a progressively enhanced application while experimenting with different patterns, tools, and technologies. As it evolved, I incorporated more real-world features such as file uploads, email notifications, realtime chat, role-based access control, protected routes, and application history.

I plan to continue improving it with technologies like RabbitMQ, Docker Containerization, and more advanced patterns. This app is meant to be a learning-driven, functional foundation of a job portal, reflecting growth, curiosity, and hands-on problem solving.

So don’t judge it by perfection 😄

## 🚀 Features

👥 **Authentication & Authorization**

- JWT-based login & registration

- Email verification for new users

- Role-based access (Admin, Recruiter, Job Seeker)

- Route protection with dynamic rendering based on user role

🡳 **Recruiter Functionality**

- Create, update, and delete company profiles

- Post job listings with detailed descriptions

- Track job applications submitted to their jobs

- Update application statuses with comments (hiring pipeline)

- Receive email notifications when a candidate applies

🡩‍🎓 **Job Seeker Functionality**

- View available jobs and filter by category, company, or keyword

- Submit job applications with resume uploads

- Track application status with detailed history

- Receive email notifications on status updates

📄 **File Handling**

- Resume upload with file storage via Multer

- View resumes directly from job applications list

📬 **Notifications**

- Email alerts via Nodemailer (for both recruiters and applicants)

💬 **Real-Time Chat System**

This app features a **floating real-time chat system** powered by **WebSockets (Socket.IO)**, allowing recruiters and job seekers to communicate instantly — even across different sessions.

_✨ Key Features_

- Floating Chat Window: Opens as a modal for smooth access from anywhere in the app.
- Notification Badges: Displays the count of unread messages across chat rooms, even when the user is offline.
- Offline Message Sync: Messages sent while a user is logged out are tracked and displayed with a badge upon next login.
- Read Status: Messages are marked as read when the chat window is opened.
- Dynamic Chat Rooms: Created automatically based on job application interactions (1:1 between recruiter and job seeker).

📊 **User Interface**

- Responsive layout using **Material UI**

- Intuitive admin panel with Drawer navigation, modals, tables, and pagination

- Inline feedback using Snackbars and confirmation dialogs

⚙️ **Admin Functionality**

- Full CRUD for users, companies, jobs, categories, statuses

- Filter and search functionality for easier record management

## 💠 Tech Stack

| Layer | Technology |

| -------------- | ----------------------------------------------- |

| **Frontend** | React + Vite, TypeScript, Material UI, Axios |

| **Backend** | Node.js, Express, Sequelize ORM, Multer, JWT, WebSockets |

| **Database** | MySQL (AWS RDS) |

| **Auth** | JWT + Bcrypt, Context API |

| **Deployment** | S3 + CloudFront (frontend), Elastic Beanstalk with HTTPS (backend), RDS (MySQL) |

| **Dev Tools** | Postman, Jest, Supertest, ESLint, Prettier |

## 📁 Project Structure

```plaintext



employment-app/



│ README.md



├── backend/



│ ├── controllers/



│ ├── models/



│ ├── routes/



│ ├── config/



│ ├── middlewares/


│ ├── test/


│ ├── sockets/


│ ├── uploads/ # Resume storage



│ ├── utils/



│ ├── app.js



│ ├── server.js



│ ├── package.json



│ └── .env.*



│



├── frontend/



│ ├── src/



│ │ ├── components/



│ │ ├── pages/



│ │ ├── hooks/



│ │ ├── services/


│ │ ├── sockets/


│ │ ├── validations/



│ │ ├── interfaces/



│ │ ├── context/



│ │ ├── utils/



│ │ ├── themes/



│ │ ├── App.tsx



│ │ ├── index.css



│ │ └── main.tsx



│ ├── public/



│ ├── index.html



│ ├── package.json



│ └── .env.*



```

## 🧩 Installation Guide

1.  Clone the Repository

2.  Install Backend Dependencies

3.  Install Frontend Dependencies

4.  Import the Database (Make sure the database `employment_db` exists or create it manually)

5.  Configure Environment Files

Copy and adjust the `.env.development` files in both `backend` and `frontend` folders as shown below.

> ⚠️ **Important:** Use a real email address in your `.env` file to enable the notification system and for the registered users to receive email notifacations about job applications.

> ⚠️ **Important:** All the users included in the dumped database uses the password 123456789.

## 🔐 Environment Variables

**Backend .env.development:**

PORT=4000

DB_HOST=localhost

DB_NAME=employment_db

DB_USER=root #your DB user

DB_PASSWORD=yourpassword #your DB password

JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email@example.com #The main email account from which app will send the emails

EMAIL_PASS=your_email_password #The password from that main email account

FRONTEND_URL=http://localhost:5173

NODE_ENV=development

ALLOWED_ORIGINS=http://localhost:5174 #Add allowed origins as needed comma separated

**Frontend .env.development:**

VITE_API_URL=http://localhost:4000/api/v1

VITE_SOCKET_URL=http://localhost:4000

✅ Use .env.production files for deployment, replacing localhost URLs with actual production domains or IPs.

## 🧪 Testing

- Backend tested with Jest and Supertest

- Token validation and protected routes tested with mock JWTs

- Services and context logic covered with custom hooks and mock APIs

## 🗃️ Database Setup

This project includes a MySQL database dump in the root of the project to get you started quickly.

1.  Import the dump

Make sure the employment_db exists or create it first:

## 🌐 Current Deployment

You can try out the app here:

🔗 [https://gigranger.com](https://gigranger.com) — Main frontend

🔗 [https://api.gigranger.com](https://api.gigranger.com) — Backend API

---

### ✅ Deployment Stack

| Component | Details |

| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| **Frontend** | React app hosted on **AWS S3** and served via **CloudFront** with custom domain and HTTPS (`gigranger.com`) |

| **Subdomain Redirect** | `www.gigranger.com` redirects to the root domain using **S3 redirect + CloudFront** |

| **Backend API** | Node.js + Express app deployed to **Elastic Beanstalk** (single-instance, no load balancer), reverse-proxied with **Nginx + Let's Encrypt SSL** at `api.gigranger.com` |

| **Database** | **AWS RDS** using **MySQL** |

## 📄 Resume Upload Feature

This project includes a file upload functionality for user resumes, which supports **both local storage (for development)** and **Amazon S3 storage (for production)**.

### 🔁 Automatic Storage Mode Detection

The app automatically switches between **local disk storage** and **S3 cloud storage** depending on the environment configuration:

| Environment | Storage Method | Trigger |

| ----------- | ---------------------- | ------------------------------------- |

| Development | Local (project folder) | No `S3_BUCKET_NAME` defined in `.env` |

| Production | Amazon S3 | `S3_BUCKET_NAME` is defined in `.env` |

---

### 📂 Local Storage (Development)

- Files are saved under:

`backend/uploads/resumes/`

- Accessible during development via:

`http://localhost:4000/uploads/resumes/<filename>`

- Ensure the following line is active in `app.js`:

```js
app.use(
  '/uploads/resumes',

  express.static(path.join(__dirname, 'uploads/resumes'))
);
```

### ☁️ Amazon S3 Storage (Production)

When the application is deployed in production and the environment is properly configured, resumes are uploaded to **Amazon S3** instead of being stored locally.

- Files are saved inside the `resumes/` folder within your S3 bucket.

- The uploaded file is publicly accessible using the returned S3 URL.

- Example of a stored file URL:

`https://your-bucket-name.s3.amazonaws.com/resumes/123456-resume.pdf`

To enable S3 uploads, ensure the following environment variables are defined in your `.env.production`:

| Variable | Description |

| ----------------------- | ------------------------------ |

| `AWS_ACCESS_KEY_ID` | Your AWS access key |

| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key |

| `AWS_REGION` | AWS region (e.g., `us-east-2`) |

| `S3_BUCKET_NAME` | Your S3 bucket name |

If any of these are missing, the app will **automatically fallback to local storage**.

## 👨‍💼 **Author & Contact**

**Marlon Alexis Manzano Reyes**

Full Stack Developer | React | Node.js | MySQL | Express.js | Typescript

📍 San Salvador, El Salvador

📧 malexismreyes@gmail.com

🌐 https://www.linkedin.com/in/alexismreyes/

## 📦 Frontend Architecture

The frontend follows a **Component-Driven Development (CDD)** approach, emphasizing separation of concerns:

- **Services** handle all API communication (e.g., `JobService`, `AuthService`).

- **Hooks** (e.g., `useJobCategories`, `useAuth`) encapsulate logic and data fetching.

- **Components** like tables, dialogs, and form inputs focus on UI rendering.

- **Pages** use these building blocks to compose full features.

This modular pattern improves reusability, testing, and clarity across the UI codebase.
