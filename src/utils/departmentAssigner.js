import { Department, Assignment } from '../models/index.js';

// Map issue types to department names
const ISSUE_TYPE_DEPARTMENT_MAP = {
  sanitation: 'Sanitation',
  public_works: 'Public Works',
  lighting: 'Lighting',
  traffic: 'Traffic Management',
  parks: 'Parks and Recreation',
  noise: 'Noise Control',
  other: 'General Services',
};

export const assignDepartment = async (reportId, issueType) => {
  try {
    const departmentName = ISSUE_TYPE_DEPARTMENT_MAP[issueType] || 'General Services';
    
    const department = await Department.findOne({
      where: { name: departmentName },
    });

    if (department) {
      await Assignment.create({
        reportId,
        departmentId: department.id,
      });
    }
  } catch (error) {
    console.error('Error assigning department:', error);
  }
};