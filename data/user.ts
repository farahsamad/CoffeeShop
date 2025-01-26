import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  console.log("email: ", email);
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log("user: ", user);
    return user;
  } catch (error) {
    console.log("unknown Error getting user by email");
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch (error) {
    return null;
  }
};
