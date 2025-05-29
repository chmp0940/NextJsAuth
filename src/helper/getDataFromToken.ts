import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    /*
    If the token is valid, it decodes the token and returns its payload (the data embedded in the token).
    */
    console.log(decodedToken);
    console.log("decodedToken", decodedToken.id);

    return decodedToken.username;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

/* 
    The client (browser) stores the token in a cookie and sends it with requests.
    But when the client (browser) makes a request to your server (for example, an API call), the browser automatically sends the cookies along with the request.
    only those who know the token secret can decode the token and access the data inside it.
    This is why you can access the token data on the server side using the getDataFromToken function.
*/
