const Hubs = require("./hubs-model.js");

// module.exports = (req, res, next) => {
//     // check that the hub is in the database
//     // if it is, continue,
//     // if not respond with 404
//     Hubs.findById(req.params.id)
//         .then(hub => {
//             if (hub) {
//                 next();
//             } else {
//                 res.status(404).json({ message: "mw not found" });
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ error: error.message });
//         });
// };

module.exports = async (req, res, next) => {
    try {
        const hub = await Hubs.findById(req.params.id);

        if (hub) {
            next();
        } else {
            res.status(404).json({ message: "mw not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
