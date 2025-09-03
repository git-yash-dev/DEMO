import { Report, User, Assignment, Department } from '../models/index.js';
import { createNotification } from './notificationController.js';
import { assignDepartment } from '../utils/departmentAssigner.js';

export const createReport = async (req, res, next) => {
  try {
    const { title, description, location, issueType, priority = 'medium' } = req.body;
    const photoURL = req.file ? `/${req.file.path}` : null;

    const report = await Report.create({
      userId: req.user.id,
      title,
      description,
      photoURL,
      location: location ? JSON.parse(location) : null,
      issueType,
      priority,
    });

    // Auto-assign to department
    await assignDepartment(report.id, issueType);

    // Create notification for admins/staff
    await createNotification(
      null, // Will be sent to all staff/admin users
      `New ${issueType} report submitted: ${title}`,
      ['staff', 'admin']
    );

    // Fetch the complete report with user info
    const completeReport = await Report.findByPk(report.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: { report: completeReport },
    });
  } catch (error) {
    next(error);
  }
};

export const getReports = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      issueType,
      status,
      priority,
      userId,
    } = req.query;

    const where = {};
    if (issueType) where.issueType = issueType;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (userId) where.userId = userId;

    // For citizens, only show their own reports
    if (req.user.role === 'citizen') {
      where.userId = req.user.id;
    }

    const offset = (page - 1) * limit;

    const { count, rows: reports } = await Report.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      success: true,
      data: {
        reports,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalItems: count,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getReportById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const report = await Report.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Assignment,
          as: 'assignments',
          include: [
            {
              model: Department,
              as: 'department',
            },
          ],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    // Citizens can only view their own reports
    if (req.user.role === 'citizen' && report.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    res.json({
      success: true,
      data: { report },
    });
  } catch (error) {
    next(error);
  }
};

export const updateReportStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const report = await Report.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    report.status = status;
    await report.save();

    // Notify the report creator
    await createNotification(
      report.userId,
      `Your report "${report.title}" status has been updated to: ${status}`
    );

    res.json({
      success: true,
      message: 'Report status updated successfully',
      data: { report },
    });
  } catch (error) {
    next(error);
  }
};