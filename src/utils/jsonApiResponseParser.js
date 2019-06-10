const JsonApiResponseParser = ({ data, included = [] }) => {
  let deepRelationshipParser;

  const relationshipsReducer = relationships => {
    return Object.keys(relationships).reduce((accumulator, relationshipKey) => {
      const subRelationship = relationships[relationshipKey].data;

      if (!subRelationship) return accumulator;

      const afterParseResult = Array.isArray(subRelationship)
        ? subRelationship.reduce(
            (rs, r) => (r ? [...rs, deepRelationshipParser(r, r.type)] : rs),
            []
          )
        : (subRelationship && deepRelationshipParser(subRelationship, subRelationship.type)) ||
          null;

      return {
        ...accumulator,
        [relationshipKey]: afterParseResult,
      };
    }, {});
  };

  deepRelationshipParser = (relationship, relationshipType) => {
    let entityRelationships = {};
    const entity = included.find(
      item => item.type === relationshipType && item.id === relationship.id
    );

    if (!entity) return {};

    if (entity.relationships) {
      entityRelationships = relationshipsReducer(entity.relationships);
    }

    return {
      ...entity.attributes,
      ...entityRelationships,
      id: entity.id,
    };
  };

  return Array.isArray(data)
    ? data.map(record => {
        return {
          ...record.attributes,
          ...(record.relationships ? relationshipsReducer(record.relationships) : null),
          id: record.id,
        };
      })
    : {
        ...data.attributes,
        ...(data.relationships ? relationshipsReducer(data.relationships) : null),
        id: data.id,
      };
};

export default JsonApiResponseParser;
