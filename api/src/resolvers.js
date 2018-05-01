const resolverMap = {
  Query: {
    notes: () => {
      return [{
        id: 1,
        content: "Hello world",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        width: 268,
        height: 268
      }];
    },
    note: (root, args) => {
      return {
        id: 1,
        content: "Hello world",
        position: {
          x: 0,
          y: 0,
          z: 0,
        },
        width: 268,
        height: 268
      };
    }
   },
};

export default resolverMap;
