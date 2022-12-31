const initialisation = {isLoading:true,memory:[]};

const reducer = (state = initialisation, action) => {
    switch (action.type) {
        case "START_LOADING":
            return {...state, isLoading:true};
        case "END_LOADING":
            return {...state, isLoading:false};
        case "FETCH_ALL":
            return {
                ...state,
                memory: action.payload.data,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
                mem:null
            };
        case "FETCH_BY_SEARCH":
            return { ...state, memory: action.payload };
        case "FETCH_MEMORY":
            return { ...state, mem: action.payload };
        case "CREATE":
            return { ...state, memory:[...state.memory,action.payload] };
        case "UPDATE":
            return { ...state, memory: state.memory.map((memory) => memory._id === action.payload._id ? action.payload : memory) };
        case "LIKE":
            return { ...state, memory: state.memory.map((memory) => memory._id === action.payload._id ? action.payload : memory) };
        case "COMMENT":
            return { ...state, memory: state.memory.map((memory) => memory._id === action.payload._id ? action.payload : memory) };
        case "DELETE":
            return { ...state, memory: state.memory.filter((memory) => memory._id !== action.payload) };
        default:
            return state;
    }
}
export default reducer;