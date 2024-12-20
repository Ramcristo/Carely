import jwt from "jsonwebtoken";

// User authentication middleware

const authUser = async (req, res, next) => {
  try {
    // I faced error while using caps in destructing so use small letter while sending it to headers

    const { token } = req.headers;
    if (!token) {
      // If the token is not found in headers means it will show error
      return res.status(404).json({
        success: false,
        message: "User must login",
      });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_KEY); // we are comparing token

    req.body.userId = tokenDecode.id
  

    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authUser;
