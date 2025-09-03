import { Department } from '../models/index.js';

const departments = [
  {
    name: 'Sanitation',
    description: 'Handles waste management, street cleaning, and sanitation issues',
  },
  {
    name: 'Public Works',
    description: 'Manages roads, bridges, and public infrastructure',
  },
  {
    name: 'Lighting',
    description: 'Street lighting, public lighting, and electrical infrastructure',
  },
  {
    name: 'Traffic Management',
    description: 'Traffic signals, road signs, and traffic flow management',
  },
  {
    name: 'Parks and Recreation',
    description: 'Public parks, recreational facilities, and green spaces',
  },
  {
    name: 'Noise Control',
    description: 'Noise complaints and sound regulation enforcement',
  },
  {
    name: 'General Services',
    description: 'Miscellaneous civic issues and general municipal services',
  },
];

export const seedDepartments = async () => {
  try {
    for (const dept of departments) {
      await Department.findOrCreate({
        where: { name: dept.name },
        defaults: dept,
      });
    }
    console.log('Department seeding completed');
  } catch (error) {
    console.error('Error seeding departments:', error);
  }
};