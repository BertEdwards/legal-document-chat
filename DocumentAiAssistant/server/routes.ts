import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { analyzeDocument, getAIEdits } from "./openai";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Document routes
  app.get("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const docs = await storage.getDocumentsByUser(req.user.id);
    res.json(docs);
  });

  app.post("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const doc = await storage.createDocument({
      ...req.body,
      userId: req.user.id,
      createdAt: new Date().toISOString(),
    });
    res.json(doc);
  });

  app.put("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const doc = await storage.getDocument(Number(req.params.id));
    if (!doc || doc.userId !== req.user.id) return res.sendStatus(403);
    const updated = await storage.updateDocument(doc.id, req.body);
    res.json(updated);
  });

  app.delete("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const doc = await storage.getDocument(Number(req.params.id));
    if (!doc || doc.userId !== req.user.id) return res.sendStatus(403);
    await storage.deleteDocument(doc.id);
    res.sendStatus(200);
  });

  // AI routes - temporarily available to all authenticated users
  app.post("/api/analyze", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      if (!req.body.text || !req.body.query) {
        return res.status(400).json({ message: "Text and query are required" });
      }

      console.log("Analyzing document with query:", req.body.query);
      const analysis = await analyzeDocument(req.body.text, req.body.query);
      console.log("Analysis completed successfully");
      res.json(analysis);
    } catch (error: any) {
      console.error("Analysis error:", error);
      next(error);
    }
  });

  app.post("/api/edit", async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) return res.sendStatus(401);
      if (!req.body.text || !req.body.instruction) {
        return res.status(400).json({ message: "Text and instruction are required" });
      }

      console.log("Editing document with instruction:", req.body.instruction);
      const edited = await getAIEdits(req.body.text, req.body.instruction);
      console.log("Edit completed successfully");
      res.json({ text: edited });
    } catch (error: any) {
      console.error("Edit error:", error);
      next(error);
    }
  });

  // Payment routes kept but inactive
  /* Uncomment to enable payments
  app.post("/api/create-checkout-session", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const session = await stripe.checkout.sessions.create({
        customer: req.user.stripeCustomerId || undefined,
        line_items: [{ price: PRICE_ID, quantity: 1 }],
        mode: "subscription",
        success_url: `${req.headers.origin}/workspace?success=true`,
        cancel_url: `${req.headers.origin}/workspace?canceled=true`,
      });

      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const userId = session.client_reference_id;
        if (userId) {
          await storage.updateUser(Number(userId), {
            stripeCustomerId: session.customer as string,
            hasPaidPlan: true
          });
        }
      }

      res.json({ received: true });
    } catch (error) {
      res.status(400).send(`Webhook Error: ${error.message}`);
    }
  });
  */

  const httpServer = createServer(app);
  return httpServer;
}