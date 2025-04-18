import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    console.error("No token found");
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification failed: ", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
