
routes = {
    getUserProfile:async (req, res)=>{
        let request = req.user
        let response = {code:"OK", body:{}};
        try{
            response.body.username = request.username;
            response.body.email = request.email 
            res.status(200).send(response)
        }catch(error){
            return res.status(400).send({ "error": error.message ? error.message : error });
        }
    }
}

module.exports = routes;