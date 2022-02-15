exports.lighthouse_poc = function lighthouse_poc(req, res) {
    console.log(req);
    res.status(200).send(`Hello ${req.query.name ? req.query.name : 'World'} from google cloud function`);
}