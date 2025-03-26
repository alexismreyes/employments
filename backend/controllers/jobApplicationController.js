const { where } = require('sequelize');
const { JobApplication, Jobs } = require('../models');
const {
  notifyRecruiterOfJobApplication,
} = require('../utils/jobApplicationNotifier');

exports.getAllJobsApplications = async (req, res) => {
  try {
    const jobApplications = await JobApplication.findAll();

    if (!jobApplications || jobApplications.length === 0)
      return res
        .status(404)
        .json({ error: 'There are no applications active' });

    res.status(200).json(jobApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplication = await JobApplication.findByPk(id);

    if (jobApplication) {
      res.status(200).json(jobApplication);
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.createJobApplication = async (req, res) => {
  try {
    //const jobApplication = req.body;
    const { userId, jobId, statusId, requestDate } = req.body;

    // 🔍 Check if the user has already applied for this job
    const existingApplication = await JobApplication.findOne({
      where: { userId, jobId },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: 'You have already applied for this job.' });
    }

    //const newJobApplication = await JobApplication.create(jobApplication);
    const newJobApplication = await JobApplication.create({
      userId,
      jobId,
      statusId,
      requestDate,
    });

    // ✅ Notify the user via email
    await notifyRecruiterOfJobApplication(
      newJobApplication.userId,
      newJobApplication.jobId,
      newJobApplication.requestDate
    );

    res.status(201).json(newJobApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplication = await JobApplication.findByPk(id);

    if (jobApplication) {
      await jobApplication.update(req.body);
      res.status(200).json(jobApplication);
    } else {
      res.status(404).json({ message: 'Job Application not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const jobApplication = await JobApplication.findByPk(id);

    if (jobApplication.statusId !== 1) {
      return res.status(400).json({
        error:
          'A recruiter already started this process, you cannot delete it.',
      });
    }

    if (jobApplication) {
      await jobApplication.destroy();
      res.status(200).json({ message: 'Job application deleted' });
    } else {
      res.status(404).json({ message: 'Job application not found' });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getJobApplicationsByUser = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure `userId` exists

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user found' });
    }

    // 🔍 Find all job applications for this user
    const jobApplications = await JobApplication.findAll({
      where: { userId },
    });

    if (!jobApplications || jobApplications.length === 0)
      return res
        .status(404)
        .json({ error: 'The user has no applications active' });

    res.status(200).json(jobApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching job applications.' });
  }
};

exports.getJobApplicationsByRecruiter = async (req, res) => {
  try {
    const userId = req.user?.id; // Ensure `userId` exists

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: No user found' });
    }

    // Find all jobs created by the recruiter
    const jobsByRecruiter = await Jobs.findAll({
      where: { createdBy: userId },
      attributes: ['id'], // Only fetch and object containg the job IDs
    });

    const jobIds = jobsByRecruiter.map((job) => job.id); // creates an array with the Ids from the jobs

    // Find job applications for jobs created by the recruiter
    const jobApplicationsForRecruiter = await JobApplication.findAll({
      where: { jobId: jobIds }, // Sequelize translates this into WHERE jobId IN (id1, id2, id3, etc)
    });

    if (
      !jobApplicationsForRecruiter ||
      jobApplicationsForRecruiter.length === 0
    )
      return res
        .status(404)
        .json({ error: 'Jobs posted by this recruiter has no applicants yet' });

    res.status(200).json(jobApplicationsForRecruiter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching job applications.' });
  }
};
