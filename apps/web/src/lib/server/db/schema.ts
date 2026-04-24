import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { randomUUID } from "crypto"
import { relations } from 'drizzle-orm';
import { user } from './auth.schema';

export const cinema = sqliteTable("cinema", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  location: text(),
  image: text(),
  rating: text(),
  opens: text(),
  closes: text(),
});

export const tickets = sqliteTable("ticket", {
  orderId: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  id: text().$defaultFn(randomUUID),
  timeSlot: integer({ mode: "timestamp" }).notNull(),
  seats: text({ mode: "json" }).$type<string[]>().notNull(),
  movieId: text().notNull(),
  status: text({ enum: ["failed", "awaiting confirmation", "successful"] }).default("awaiting confirmation"),
  cimemaId: integer(),
  userId: text(),
}, (t) => [
  uniqueIndex("ticketId_idx").on(t.id)
])

export const ticketRelations = relations(tickets, ({ one }) => ({
  cinema: one(cinema, {
    fields: [tickets.cimemaId],
    references: [cinema.id]
  }),
  user: one(user, {
    fields: [tickets.userId],
    references: [user.id]
  })
}));

export const cinemaRelations = relations(cinema, ({ many }) => ({
  tickets: many(tickets)
}))



export * from './auth.schema';
