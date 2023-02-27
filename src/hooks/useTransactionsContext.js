import { useContext } from "react";
import { TransactionsContext } from "../context/TransactionsContext";

export const useTransactionsContext =()=>{
    const context = useContext(TransactionsContext)

    if (!context){
        throw Error('useTransactionsContext must be used inside an WorkoutContextProvider')
    }

    return context
}