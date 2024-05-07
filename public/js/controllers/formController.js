const submitForm = (collection, req, res) => {
  const formData = req.body;
  collection.insertOne(formData)
    .then(result => {
      if (result.insertedCount > 0) {
        res.json({ statusCode: 200, data: [result.ops], message: "Data inserted successfully" });
      } else {
        throw new Error("No documents inserted");
      }
    })
    .catch(err => {
      console.error("Error inserting data:", err);
      res.status(500).json({ statusCode: 500, message: "Internal server error" });
    });
};

module.exports = {
  submitForm
};