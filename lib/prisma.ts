import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
console.log("Initializing prisma Client...");
console.log("Connecting to database:", process.env.DATABASE_URL);

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
  console.log("Prisma Client set in global object for development");
}
console.log("Prisma Client initialized successfully.");

// import { PrismaClient } from "@prisma/client";
// // import "./global";  Make sure to import the global type definition

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
