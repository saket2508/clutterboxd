module.exports = function(req, res, next) {
    const { email, name, password } = req.body;
  
    function validEmail(userEmail) {
        // regex for checking if email is valid
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
      console.log(!email.length);
      if (![email, name, password].every(Boolean)) {
        return res.status(401).json({error: "Missing Credentials", success: false});
      } else if (!validEmail(email)) {
        return res.status(401).json({error: "Invalid Email", success: false});
      }
    } else if (req.path === "/login") {
      if (![email, password].every(Boolean)) {
        return res.status(401).json({error: "Missing Credentials", success: false});
      } else if (!validEmail(email)) {
        return res.status(401).json({error: "Invalid Email", success: false});
      }
    }
  
    next();
  };