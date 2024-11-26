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


const uploadTaskFile = async (taskId, file) => {
    if (!taskId || !file) {
        throw new Error('Task ID and file are required');
    }

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append('file-upload', file); // Ensure this matches your server's file field name
    formData.append('taskId', taskId);

    // Make the API call
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}` // If auth is required
        },
        body: formData
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'File upload failed');
    }

    return data;
};

const getTaskDetails = async (taskId) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/${taskId}/details`, {
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

const getFile= async  (url, fileType) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/file`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ url, fileType })
    });

    if (!res.ok) {
        throw new Error('Failed to fetch file');
    }

    return res;
}

const submitTask = async (taskId) => {

    if (!taskId) {
        throw new Error('Task ID is required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ taskId })
    });


    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Failed to submit task');
    }

    return data;
}

const approveTask = async (taskId) => {

    if (!taskId) {
        throw new Error('Task ID is required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/approve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ taskId })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Failed to approve task');
    }

    return data;
}


const sendBackTask = async (taskId, comments) => {
    if (!taskId || !comments) {
        throw new Error('Task ID and comments are required');
    }

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks/sendBack`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ taskId, comments })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error || 'Failed to send task back');
    }

    return data;
}


export { getTasksClient, assignTask, getApplicationTasks, uploadTaskFile, getTaskDetails, getFile, submitTask, approveTask, sendBackTask};
