import { Router } from "express";
import {
	chatWithAssistant,
	sendOtp,
	verifyOtp,
	submitLead,
	getLeads,
	loginAdmin,
	requireAdmin,
	getAdminContracts,
	deleteAdminContract,
	updateAdminPassword,
	forgotAdminPassword,
} from "../controller/user.controller.js";

const router = Router();

router.post("/chat", chatWithAssistant);


router.post("/otp/send", sendOtp);
router.post("/otp/verify", verifyOtp);


router.post("/leads", submitLead);
router.get("/leads", getLeads);
router.post("/admin/login", loginAdmin);
router.post("/admin/forgot-password", forgotAdminPassword);
router.get("/admin/contracts", requireAdmin, getAdminContracts);
router.delete("/admin/contracts/:contractId", requireAdmin, deleteAdminContract);
router.post("/admin/password", requireAdmin, updateAdminPassword);

export default router;

