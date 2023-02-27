import { useEffect, useState } from 'react'
import Select from 'react-dropdown-select'
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import { yearOptions, monthOptions } from '../configs/dropdownOptions'
import Piechart from '../components/Piechart'
import Barchart from '../components/Barchart'
import Tableview from '../components/Tableview'
import Balanceview from '../components/Balanceview'
/*
TODO: 
      4.delete workout related codes/ clean up
      6.show institution and routing number in banklink page after a connection
      7.use plaid get balance to see networth/ make new networth page
      
 */
const Home = () => {
    const { transactions, dispatch } = useTransactionsContext()
    // const {workouts, dispatch:tDispatch}= useWorkoutsContext()
    const { user } = useAuthContext()
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [balance, setBalance] = useState([])


    //will only fire once due to the empty array
    //for production the end point should be exact(not '/api/workouts') we added proxy in package.json to overcome CORS in development
    useEffect(() => {

        const fetchTransactions = async () => {
            /*
            We import useAuthContext in Home, WorkoutForm and WorkoutDetails(where we send requests to the api) to get access to user and user token. 
            Then we add the user token to the response header to get access in the api req.
            */
            const response = await fetch(`/api/plaid/transactions/${year}/${month}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            })
            const data = await response.json()
            const json = data.latest_transactions

            if (response.ok) {
                dispatch({ type: 'SET_TRANSACTIONS', payload: json })


            }
        }
        const createlink = async () => {
            const response = await fetch("/api/plaid/create_link_token", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
            const data = await response.json()
            localStorage.setItem("link_token", data.link_token);

        }
        const fetchBalance = async () => {
            /*
            We import useAuthContext in Home, WorkoutForm and WorkoutDetails(where we send requests to the api) to get access to user and user token. 
            Then we add the user token to the response header to get access in the api req.
            */
            const response = await fetch('/api/plaid/balance', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            })
            const data = await response.json()
            setBalance(data.accounts)


        }
        if (user) {
            createlink()
            fetchTransactions()
            fetchBalance()
        }

    }, [dispatch, user, year, month])
    return (
        <div>
            <div className="dropdown">
                <div >
                    <Select
                        options={yearOptions}
                        placeholder="Year"
                        onChange={(value) => setYear(value[0].label)}
                        className="box"
                    />
                </div>
                <div >
                    <Select
                        options={monthOptions}
                        placeholder="Month"
                        onChange={(value) =>
                            setMonth(value[0].value)
                        }
                        className="box"
                    />
                </div>
            </div>
            {(transactions === null ||
                transactions.length === 0) &&
                <div className='noData'>

                    No Data/ Please select appropriate date

                </div>
            }
            {(transactions !== null) &&
                transactions.length !== 0 &&
                <div className='chart'>

                    <Piechart transactions={transactions} />

                    <Barchart transactions={transactions} />

                </div>
            }
            <div className="home">
                <div className='tableh'>
                    Transactions
                </div>
                {transactions && <Tableview transactions={transactions} />}
                <div className='tableh'>
                    Balance
                </div>
                {balance != null && <Balanceview accounts={balance} />}

            </div>
        </div>
    )
}

export default Home