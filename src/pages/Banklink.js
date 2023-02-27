import { useState } from 'react'
import { usePlaidLink, } from 'react-plaid-link';

import { useAuthContext } from '../hooks/useAuthContext'

const Banklink = () => {
    let token = localStorage.getItem("link_token")
    const { user } = useAuthContext()
    const [update, setUpdate] = useState(null)

    const onSuccess = async (publicToken, metadata) => {
        // send token to client server
        const response = await fetch("/api/plaid/set_access_token", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ public_token: publicToken }),
        });
        const json = await response.json()
        
    }
    // The usePlaidLink hook manages Plaid Link creation
    // It does not return a destroy function;
    // instead, on unmount it automatically destroys the Link instance
    const config = {
        token,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);
    //get identity
    /*
    useEffect(()=>{
        const getIdentity = async () =>{
            const response = await fetch("/api/plaid/institution",{
                method: 'GET',
                headers: {
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${user.token}`
                },
            })
            const data = await response.json()       
        }
        getIdentity() 
    },[user])
    */
    const handleClick = async () => {
        const response = await fetch('/api/plaid/update_transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            }
        })
        const json = await response.json()
        if (response.ok) {
            setUpdate(json.number)
        }
    }
    return (
        <div className="home">
            <div>
                <button onClick={() => open()
                } disabled={!ready}>
                    <strong>Link account</strong>
                </button>
            </div>
            <div>
                <button onClick={handleClick}>
                    <strong>Update Transactions</strong>
                </button>
                {update != null && <div>{update} transactions updated/added</div>}

            </div>
        </div>
    )
}

export default Banklink