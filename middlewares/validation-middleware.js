const loggeado = (req, res, next) => {
    if (req.session.activeUser === undefined) {
      res.redirect("/user/login")
    } else {
      next() 
    }
  }
  
  
  
  module.exports = {
    loggeado: loggeado
    
  }
  