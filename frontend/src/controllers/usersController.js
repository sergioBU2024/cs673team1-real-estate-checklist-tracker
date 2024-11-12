/*******************************Login User **************************************/
const loginUser = async (email, password) => {
    if(!email || !password){
        throw Error('All fields are required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, {
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

    return data;
}

export { loginUser };


/*******************************Register User **************************************/
const registerUser = async (firstName, lastName, email, password, role, officeLocation, phoneNumber) => {
    
    //if agent require officeLocation
    if(role === 'Agent'){
        if(!officeLocation){
            throw Error('All fields are required');
        }
    }

    if(!firstName || !lastName || !email || !password || !role || !phoneNumber){
        throw Error('All fields are required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password, role, firstName, lastName, phoneNumber, officeLocation})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    console.log(data);

    return data;
}

export { registerUser };