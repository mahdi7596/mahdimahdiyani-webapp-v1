import cron from "node-cron";

import Reservation from "../models/reservation.model.js";

// This job runs every minute
cron.schedule("* * * * *", async () => {
  console.log("Reservation cleaner started");
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

  const result = await Reservation.updateMany(
    {
      status: "pending",
      createdAt: { $lt: fiveMinutesAgo },
    },
    { $set: { status: "cancelled" } }
  );

  if (result.modifiedCount > 0) {
    console.log(`${result.modifiedCount} reservations auto-cancelled.`);
  }
});
