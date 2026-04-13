const teamModel = require('./team.model');

// GET ALL TEAM MEMBERS
const getAllTeamMembers = async () => {
  try {
    return await teamModel.getAllTeamMembers();
  } catch (error) {
    throw new Error('Failed to fetch team members: ' + error.message);
  }
};

// GET TEAM MEMBER BY ID
const getTeamMemberById = async (id) => {
  try {
    const member = await teamModel.getTeamMemberById(id);
    if (!member) {
      throw new Error('Team member not found');
    }
    return member;
  } catch (error) {
    throw new Error('Failed to fetch team member: ' + error.message);
  }
};

// CREATE TEAM MEMBER
const createTeamMember = async (memberData) => {
  try {
    // Validate required fields
    if (!memberData.name || !memberData.position) {
      throw new Error('Name and position are required');
    }

    return await teamModel.createTeamMember(memberData);
  } catch (error) {
    console.error('Service error creating team member:', error.message);
    throw new Error('Failed to create team member: ' + error.message);
  }
};

// UPDATE TEAM MEMBER
const updateTeamMember = async (id, memberData) => {
  try {
    // Check if member exists
    const existingMember = await teamModel.getTeamMemberById(id);
    if (!existingMember) {
      throw new Error('Team member not found');
    }

    // Validate required fields
    if (!memberData.name || !memberData.position) {
      throw new Error('Name and position are required');
    }

    await teamModel.updateTeamMember(id, memberData);
    return { message: 'Team member updated successfully' };
  } catch (error) {
    throw new Error('Failed to update team member: ' + error.message);
  }
};

// DELETE TEAM MEMBER
const deleteTeamMember = async (id) => {
  try {
    // Check if member exists
    const existingMember = await teamModel.getTeamMemberById(id);
    if (!existingMember) {
      throw new Error('Team member not found');
    }

    await teamModel.deleteTeamMember(id);
    return { message: 'Team member deleted successfully' };
  } catch (error) {
    throw new Error('Failed to delete team member: ' + error.message);
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};