import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../supabaseClient"; //imports UsersDatabase to access the userdatabase for email login
import stringHash from "string-hash";

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const user = await UsersDatabase.from("Users")
    .select()
    .eq("Email", body.email)
    .eq("Password", body.password);
  if (user) {
    const cookieID = uuidv4();
    await UsersDatabase.from("Users")
      .update({
        session_id: cookieID,
      })
      .eq("Email", body.email);
    const headers = {
      "Set-Cookie": cookie.serialize("Session_id", cookieID, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "lax",
        path: "/",
      }),
    };
    return json(
      {
        status: 200,
        message: "User Already Exists But Login Successful.",
      },
      { headers }
    );
  }
  if (!user) {
    const cookieID = uuidv4();
    await UsersDatabase.from("Users").insert({
      Email: body.email,
      Password: stringHash(body.password),
      session_id: cookieID,
      Member: "free",
    });
    const headers = {
      "Set-Cookie": cookie.serialize("Session_id", cookieID, {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        secure: true,
        sameSite: "lax",
        path: "/",
      }),
    };
    return json(
      {
        status: 200,
        message: "User Created and Login Successful.",
      },
      { headers }
    );
  }
};
