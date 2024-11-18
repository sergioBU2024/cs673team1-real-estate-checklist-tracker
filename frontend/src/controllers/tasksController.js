const getTasksClient = async (clientId, applicationId) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${clientId}/${applicationId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

const assignTask = async(title, description, type, assigned_to, applicationId) => {
    if(!title || !type || !assigned_to || !applicationId){
        throw new Error('All fields are required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/assign`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            title,
            description,
            type,
            assigned_to,
            applicationId
        })
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

const getApplicationTasks = async (applicationId) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${applicationId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
    });

    const data = await res.json();

    if(!res.ok){
        throw Error(data.error);
    }

    return data;
}

export { getTasksClient, assignTask, getApplicationTasks };
