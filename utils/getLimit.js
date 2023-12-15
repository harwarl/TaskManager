function getLimit(obj, limit, isPage) {
  const limitClause = {};
  if (!isPage) return limitClause;
  let page = isPage ? obj["page"] - 1 : 0;
  limitClause.offset = page * limit;
  limitClause.limit = limit;
  return limitClause;
}

module.exports = { getLimit };
