import { Notification, User } from '../models/index.js';

export const createNotification = async (userId, message, roles = null) => {
  try {
    if (userId) {
      // Create notification for specific user
      await Notification.create({
        userId,
        message,
      });
    } else if (roles) {
      // Create notifications for users with specific roles
      const users = await User.findAll({
        where: { role: roles },
        attributes: ['id'],
      });

      const notifications = users.map(user => ({
        userId: user.id,
        message,
      }));

      await Notification.bulkCreate(notifications);
    }
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const createNotificationEndpoint = async (req, res, next) => {
  try {
    const { userId, message } = req.body;

    await createNotification(userId, message);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const getUserNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20, unreadOnly = false } = req.query;

    // Check if user can access these notifications
    if (req.user.role === 'citizen' && req.user.id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const where = { userId };
    if (unreadOnly === 'true') {
      where.read = false;
    }

    const offset = (page - 1) * limit;

    const { count, rows: notifications } = await Notification.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      success: true,
      data: {
        notifications,
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

export const markNotificationAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByPk(id);
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    // Check if user can access this notification
    if (req.user.role === 'citizen' && req.user.id !== notification.userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    notification.read = true;
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
};