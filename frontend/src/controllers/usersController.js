/*******************************Login User **************************************/
const loginUser = async (email, password) => {
    if(!email || !password){
        throw Error('All fields are required');
    }

    const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    console.log(data);
}

export { loginUser };