const Parent = require('../models/Parent')
const Children = require('../models/Children')

exports.parentsChildrenSeed= async () =>{
    try {
        const parentsCount = await Parent.estimatedDocumentCount();
        if (parentsCount > 0) return;

        const parentsResult = await Promise.all([
            new Parent({description: "Ropa de hombre"}).save(),
            new Parent({description: "Ropa de mujer"}).save(),
        ])
        await Promise.all([
            new Children({name: "Blue Jeans", parentId: parentsResult[0]._id}).save(),
            new Children({name: "Gorra", parentId: parentsResult[0]._id}).save(),
            new Children({name: "Leggins", parentId: parentsResult[1]._id}).save(),
            new Children({name: "Falda tres cuartos", parentId: parentsResult[1]._id}).save(),
            new Children({name: "Crop top", parentId: parentsResult[1]._id}).save(),
        ])
    } catch (error) {
        console.log('ParentChildSeed Error', error)
    }
}