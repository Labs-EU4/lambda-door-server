const Sentry = require('@sentry/node');
const db = require('./dataDisplayModel');

const GetJobRoles = async (req, res) => {
  try {
    const Roles = await db.JobRole();
    return res.status(200).json(Roles);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  GetJobRoles,
};
