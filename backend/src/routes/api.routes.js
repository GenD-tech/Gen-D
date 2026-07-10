import { Router } from "express";
import {
	chatWithAssistant,
	submitLead,
	getLeads,
	loginAdmin,
	requireAdmin,
	getAdminContracts,
	deleteAdminContract,
	updateAdminPassword,
} from "../controller/user.controller.js";

const router = Router();

router.post("/chat", chatWithAssistant);
router.post("/leads", submitLead);
router.get("/leads", getLeads);
router.post("/admin/login", loginAdmin);
router.get("/admin/contracts", requireAdmin, getAdminContracts);
router.delete("/admin/contracts/:contractId", requireAdmin, deleteAdminContract);
router.post("/admin/password", requireAdmin, updateAdminPassword);

export default router;
