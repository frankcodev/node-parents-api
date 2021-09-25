const Children = require("../models/Children");
const Parent = require("../models/Parent");

exports.getChildrenByParent = async (req, res) => {
    const { parentId } = req.params;
    const {page} = req.query;
    const limit = 50;
    const options = {
        limit, 
        page: page || 1 
    }

    try {
        const parent = await Parent.findById(parentId);
        if(!parent) return res.status(400).json({error: 'Parent category does not exist '});

        const childrens = await Children.paginate({parentId}, options);
        return res.status(200).json(childrens)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
}