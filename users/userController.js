/* eslint-disable camelcase */
const Sentry = require('@sentry/node');
const Users = require('./userModel');
const generateToken = require('../utils/generateToken');

const getUser = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};
const checkSlackName = async (id, slack_name, username) => {
  if (slack_name !== username) {
    await Users.update(id, { username: slack_name });
  }
};
const addUser = async (req, res) => {
  try {
    const newUser = {
      full_name: req.body.name,
      username: req.body.name,
      email_address: req.body.email_address,
      profile_picture: req.body.img_72,
      slack_id: req.body.slack_id,
    };

    const existingUser = await Users.findBy(newUser.slack_id);

    if (existingUser) {
      await checkSlackName(
        existingUser.id,
        newUser.username,
        existingUser.username
      );
      await generateToken(res, existingUser.id, existingUser.full_name);
      return res.status(200).json(existingUser);
    }
    const user = await Users.insert(newUser);

    await generateToken(res, user.id, user.full_name);
    return res.status(201).json(user);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findById(id);
  const changes = {
    full_name: req.body.full_name || user.full_name,
    slack_id: req.body.slack_id || user.slack_id,
    username: req.body.username || user.username,
    email_address: req.body.email_address || user.email_address,
    profile_picture: req.body.profile_picture || user.profile_picture,
    location: req.body.location || user.location,
    longitude: req.body.longitude || user.longitude,
    latitude: req.body.latitude || user.latitude,
    update_at: req.body.updated_at,
  };

  try {
    const updatedUser = await Users.update(id, changes);
    return res.status(200).json(updatedUser);
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res
      .clearCookie('token')
      .status(204)
      .end();
  } catch (error) {
    Sentry.captureException(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  logoutUser,
};
