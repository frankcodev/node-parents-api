const Parent = require('../models/Parent')

exports.getParents = async (req, res) => {
    const {page} = req.query;
    const limit = 50;
    const options = {
        limit, 
        page: page || 1 
    }
    try {
        const parents = await Parent.paginate({}, options);
        return res.status(200).json(parents)
    } catch (error) {
        
    }
}

