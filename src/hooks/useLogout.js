import { useAuthContext } from "./useAuthContext"
import { useTransactionsContext } from "./useTransactionsContext"


export const useLogout =()=>{
    const {dispatch} = useAuthContext()
    const {dispatch: transactionDispatch} = useTransactionsContext()

    const logout =()=>{
        //remove user from storage
        localStorage.removeItem('user')
        localStorage.removeItem('link_token')
        sessionStorage.removeItem('accessToken')

        //dispatch logout action
        dispatch({type:'LOGOUT'})
        transactionDispatch({type:'SET_TRANSACTIONS', payload: null})
    }
    return {logout}
}