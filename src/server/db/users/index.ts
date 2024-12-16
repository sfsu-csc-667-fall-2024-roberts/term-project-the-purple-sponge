import bcrypt from "bcrypt";
// import { createHash } from "crypto"; not really needed
import db from "../connection";
import { FIND_BY_EMAIL_SQL, REGISTER_SQL } from "./sql";

// types to check
type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};

// Take in username, email, clearTextPassword
const register = async (
  username: string,
  email: string,
  clearTextPassword: string
): Promise<User> => {
  console.log("Registering user");
  const password = await bcrypt.hash(clearTextPassword, 10);
  // const gravatar = createHash("sha256").update(email).digest("hex");
  return await db.one(REGISTER_SQL, [username, email, password]);
};

/* Take in email and clearTextPassword
 *  Searches for matching user by email
 *  Verifies the clearTextPassword with the hashed version in the database
 */
const login = async (
  email: string,
  clearTextPassword: string
): Promise<User> => {
  //TODO: errorhandle the case if user is not found and the promise rejects
  const user = await findByEmail(email);

  // compare user inputed password with hashed password from database
  const isValid = await bcrypt.compare(clearTextPassword, user.password);
  if (isValid) {
    console.log("Successfully logged in!");
    return user;
  } else {
    throw new Error("Invalid credentials provided");
  }
};

const findByEmail = async (email: string): Promise<User> => {
  console.log("Searching user table by email...", email);
  return await db.one(FIND_BY_EMAIL_SQL, [email]);
};

export default { register, login, findByEmail };
export type { User };
