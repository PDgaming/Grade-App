import * as cookie from "cookie";
import { v4 as uuidv4 } from "uuid";
import { json, type RequestHandler } from "@sveltejs/kit";
import { UsersDatabase } from "../../supabaseClient"; //imports UsersDatabase to access the userdatabase for email login

//@ts-ignore
export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { data, error } = await UsersDatabase.from("Users")
    .select()
    .eq("Email", body.email)
    .eq("Password", body.password);
  if (error) {
    return json({
      status: 500,
      message: "There was an error",
    });
  }
  if (data) {
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
        message: "Login Successful.",
      },
      { headers }
    );
  }
  if (!data) {
    return json({
      status: 404,
      message: "User not found in Database.",
    });
  }
};
