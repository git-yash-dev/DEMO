import express from 'express';
import {
  createReport,
  getReports,
  getReportById,
  updateReportStatus,
} from '../controllers/reportController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         photoURL:
 *           type: string
 *         location:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         issueType:
 *           type: string
 *           enum: [sanitation, public_works, lighting, traffic, parks, noise, other]
 *         status:
 *           type: string
 *           enum: [submitted, acknowledged, in_progress, resolved]
 *         priority:
 *           type: string
 *           enum: [low, medium, high, urgent]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Create a new report
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - issueType
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *               location:
 *                 type: string
 *                 description: JSON string with lat and lng
 *               issueType:
 *                 type: string
 *               priority:
 *                 type: string
 */
router.post('/', authenticate, upload.single('photo'), createReport);

/**
 * @swagger
 * /api/reports:
 *   get:
 *     summary: Get reports
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: issueType
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 */
router.get('/', authenticate, getReports);

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Get report by ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/:id', authenticate, getReportById);

/**
 * @swagger
 * /api/reports/{id}/status:
 *   put:
 *     summary: Update report status
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [submitted, acknowledged, in_progress, resolved]
 */
router.put('/:id/status', authenticate, authorize('staff', 'admin'), updateReportStatus);

export default router;