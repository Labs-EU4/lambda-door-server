const Interests = require('./interestsModel');

const getInterests = async (req, res) => {
  try {
    const interests = await Interests.findAll();
    return res.status(200).json(interests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getInterest = async (req, res) => {
  try {
    return res.status(200).json(req.interest);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserInterests = async (req, res) => {
  try {
    const interests = await Interests.findByUserId(req.params.id);
    return res.status(200).json(interests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addUserInterest = async (req, res) => {
  try {
    const newUserInterest = {
      user_id: req.body.user_id,
      interest_id: req.body.interest_id,
    };

    // currently there is a missing middleware that prevents duplicates of interests

    await Interests.insert(newUserInterest);
    const interests = await Interests.findByUserId(req.body.user_id);
    return res.status(201).json(interests);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getUserInterest = async (req, res) => {
  try {
    return res.status(200).json(req.interest);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteUserInterest = async (req, res) => {
  try {
    const { id } = req.params;

    await Interests.remove(id);
    return res
      .status(200)
      .json({ message: 'Successfully Deleted', deleted: req.interest });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getInterests,
  getInterest,
  getUserInterests,
  addUserInterest,
  getUserInterest,
  deleteUserInterest,
};
