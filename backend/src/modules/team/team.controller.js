const teamService = require('./team.service');
const response = require('../../utils/response');

// GET ALL TEAM MEMBERS
const getAllTeamMembers = async (req, res) => {
  try {
    const members = await teamService.getAllTeamMembers();
    response.success(res, 'Team members retrieved successfully', members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    response.error(res, error.message, 500);
  }
};

// GET TEAM MEMBER BY ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await teamService.getTeamMemberById(id);
    response.success(res, 'Team member retrieved successfully', member);
  } catch (error) {
    response.error(res, error.message, 404);
  }
};

// CREATE TEAM MEMBER
const createTeamMember = async (req, res) => {
  try {
    const memberData = req.body;

    // Handle file upload
    if (req.file) {
      memberData.image_url = `/uploads/${req.file.filename}`;
    }

    const newMember = await teamService.createTeamMember(memberData);
    response.success(res, 'Team member created successfully', newMember, 201);
  } catch (error) {
    console.error('Error creating team member:', error.message);
    response.error(res, error.message, 400);
  }
};

// UPDATE TEAM MEMBER
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const memberData = req.body;

    // Handle file upload
    if (req.file) {
      memberData.image_url = `/uploads/${req.file.filename}`;
    }

    const result = await teamService.updateTeamMember(id, memberData);
    response.success(res, result.message);
  } catch (error) {
    response.error(res, error.message, 400);
  }
};

// DELETE TEAM MEMBER
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await teamService.deleteTeamMember(id);
    response.success(res, result.message);
  } catch (error) {
    response.error(res, error.message, 400);
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};