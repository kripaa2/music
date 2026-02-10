const admin = require("../config/firebase");

const getHistory = async (req, res) => {
  const snapshot = await admin
    .firestore()
    .collection("searchHistory")
    .where("userId", "==", req.user.uid)
    .orderBy("searchedAt", "desc")
    .get();

  const history = snapshot.docs.map(doc => doc.data());
  res.json(history);
};

module.exports = { getHistory };
