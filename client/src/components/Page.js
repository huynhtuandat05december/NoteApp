import axios from 'axios';
import { useEffect, useState } from 'react';
import Login from './Login'
import Note from './Note'


function Page() {
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('tokenStore');
            if (token) {
                const verified = await axios.get('/users/verify', {
                    headers: { Authorization: token }
                })
                setLogin(verified.data);
                if (!verified.data) { return localStorage.clear() }
            }
            else {
                setLogin(false);
            }
        }
        checkLogin();



    })
    return (
        <div className="App">
            {
                isLogin ? <Note setLogin={setLogin} /> : <Login setLogin={setLogin} />
            }
        </div>
    );
}

export default Page;
