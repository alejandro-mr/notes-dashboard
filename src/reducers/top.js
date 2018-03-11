const top = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_TOP":
      state = action.top
      return state
    default:
      return state;
  }
}

export default top
