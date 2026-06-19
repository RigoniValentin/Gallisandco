export const freeConsultationHref =
  process.env.NEXT_PUBLIC_FREE_CONSULTATION_URL ?? "/contact#free-consultation";

/** Public Google Calendar appointment-scheduling link used to book the free consultation. */
export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL ??
  "https://calendar.app.google/b4PqF6DATxmMn1z76";

/**
 * Embeddable Google Calendar appointment-schedule URL (`?gv=true`) for rendering
 * the scheduler inside an iframe on our own platform.
 */
export const bookingEmbedUrl =
  process.env.NEXT_PUBLIC_BOOKING_EMBED_URL ??
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3zNRF4RZxbG2MdAB0aewKpcvIsTBBqZ_-4WypcTgizHWAyeYeRB-0HWLeIS7LQ4HPwNPdmhUoi?gv=true";