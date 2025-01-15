import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  console.log("email: ", email);
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    console.log("user: ", user);
    return user;
  } catch (error) {
    console.log("///////////////////////first error");
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
