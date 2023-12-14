function buildQuery(object) {
  const rows = Object.values(object);
  const columns = Object.keys(object);
  const objLen = columns.length;
  let queryClause = "";
  let queryArray = [];
  for (let x = 0; x < objLen; x++) {
    queryArray.push(rows[x]);
    if (x === objLen - 1) {
      queryClause = queryClause + `${columns[x]} = $${x + 1}`;
    } else {
      queryClause = queryClause + `${columns[x]} = $${x + 1} ` + ",";
    }
  }
  return { queryClause, queryArray, objLen };
}

module.exports = {
  buildQuery,
};
