import { createContext, useReducer } from "react";

export const TransactionsContext = createContext()

export const transactionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            return {
                transactions: action.payload
            }
        case 'CREATE_TRANSACTIONS':
            return {
                transactions: [action.payload, ...state.transactions]
            }
        case 'DELETE_TRANSACTION':
            return {
                transactions: state.transactions.filter((w) => w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const TransactionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(transactionsReducer, {
        transactions: null
    })

    //console.log('TransactionsContext state: ', state)

    return (
        <TransactionsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TransactionsContext.Provider>
    )
}