const notfound = (req, res) => {
    res.status(404).send("Route not found, check your URL and try and try again")
}

module.exports = notfound