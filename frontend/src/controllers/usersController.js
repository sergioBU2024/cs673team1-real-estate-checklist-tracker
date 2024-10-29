/*******************************Login User **************************************/
const loginUser = async (email, password, role) => {
    if(!email || !password || !role){
        throw Error('All fields are required');
    }

    const res = await fetch("/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, role})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

export { loginUser };


/*******************************Register User **************************************/
const registerUser = async (email, password, role) => {
    if(!email || !password || !role){
        throw Error('All fields are required');
    }

    const res = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, role})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    console.log(data);
}

export { registerUser };