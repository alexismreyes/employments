// Custom CORS middleware to dynamically allow specific origins
// This is useful when deploying to environments like S3 or EB
// where static frontends call backend APIs from a different domain

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:5173', // Local frontend (Vite dev server)
  'http://employmentapps3.s3-website.us-east-2.amazonaws.com', // S3-hosted production frontend
];

const corsMiddleware = cors({
  origin: function (origin, callback) {
    console.log('🔍 Request origin:', origin);
    if (!origin || allowedOrigins.includes(origin.trim())) {
      return callback(null, true);
    } else {
      console.error('⛔ Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

module.exports = corsMiddleware;
