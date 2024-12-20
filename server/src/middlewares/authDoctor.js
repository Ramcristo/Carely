import jwt from "jsonwebtoken";

// doctor authentication middleware

const authDoctor = async (req, res, next) => {
  try {
    // I faced error while using caps in destructing so use small letter while sending it to headers

    const {dtoken } = req.headers;
    if (!dtoken) {
      // If the token is not found in headers means it will show error
      return res.status(404).json({
        success: false,
        message: "Doctor must login",
      });
    }

    const tokenDecode = jwt.verify(dtoken, process.env.JWT_KEY); // we are comparing token

    req.body.docId = tokenDecode.id
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authDoctor;
