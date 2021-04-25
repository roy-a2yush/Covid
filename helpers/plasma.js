exports.upload = async function(req, res, newPlasmaDonor) {
    try {
        const uploadResult = await newPlasmaDonor.save()
        res.json(a1)
    } catch (err) {
        res.status(400).send(err)
    }
}