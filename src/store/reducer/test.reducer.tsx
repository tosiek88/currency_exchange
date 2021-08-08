const TEST = "TEST";

interface TestActionType {
  type: typeof TEST;
  payload: { test: string };
}

const TestReducer = (state = {test:'test'}, action: TestActionType) => {
  switch (action.type) {
    //returns updated state
    case "TEST":
      return { ...action.payload };
    //else the current state is retained
    default:
      return state;
  }
};

export { TestReducer };
