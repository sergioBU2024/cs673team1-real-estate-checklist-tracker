/**********************************************Get All Applications of a specific user  *********************************************/
const getApplicationsClient = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications/client`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
        
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

/**********************************************Get All Applications of a specific user  *********************************************/
const getApplicationsAgent = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/applications/agent`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
        
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

/**********************************************Create New Application *******************************************/
const addApplication = async (location, userEmails) => {
    if(!location || !userEmails){
        throw Error('All fields are required');
    }

    const res = await fetch('/api/applications/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({location, userEmails})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

/**********************************************Delete Application *******************************************/
const deleteApplication = async (_id) => {
    const res = await fetch(`/api/applications/${_id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

/**********************************************Update Application *******************************************/
const updateApplication = async (application, location, userEmails) => {
    if(!location || !userEmails){
        throw Error('All fields are required');
    }

    const res = await fetch(`/api/applications/${application._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({location, userEmails})
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

export { getApplicationsClient, getApplicationsAgent, addApplication, deleteApplication, updateApplication };

