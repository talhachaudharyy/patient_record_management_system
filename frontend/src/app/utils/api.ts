import Cookies from 'js-cookie';


import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

interface Patient {
  _id: string;
  name: string;
  email: string;
  type: string;
}

export const registerUser = async (userData: { name: string; email: string; password: string; type: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`The Email is Already Registered.`);
    } else {
      throw new Error('Registration failed: An unknown error occurred.');
    }
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    // Check if the response contains the expected structure
    if (!data || !data.token || !data.user) {
      throw new Error('Invalid response from server');
    }

    // Save user data in cookies
    Cookies.set('userData', JSON.stringify(data.user), { expires: 1 }); // Expires in 1 day

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    } else {
      throw new Error('Login failed: An unknown error occurred.');
    }
  }
};

//admin login

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Capture and throw the response error if available
      const errorResponse = await response.json();
      const errorMessage = errorResponse.message || 'Login failed';
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // Check if the response contains the expected structure
    if (!data || !data.token || !data.admin) {
      throw new Error('Invalid response from server');
    }

    // Save admin data in cookies
    Cookies.set('adminData', JSON.stringify(data.admin), { expires: 1 }); // Expires in 1 day

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Login failed: ${error.message}`);
    } else {
      throw new Error('Login failed: An unknown error occurred.');
    }
  }
};

// api/admin password change

export const changeAdminPassword = async (email: any, newPassword: any, confirmPassword: any) => {
  // Get adminData from the cookie
  const adminData = Cookies.get('adminData');
  
  // Check if the cookie is available
  if (!adminData) {
    throw new Error('No authentication data found. Please log in again.');
  }

  // Parse the adminData to access the token
  const { token } = JSON.parse(adminData);

  try {
    // Make the API call to change the password
    const response = await axios.post(`${API_BASE_URL}/api/admin/passwordchange`, {
      email,
      newPassword,
      confirmPassword,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
      },
    });

    // Return the success response
    return response.data;
  } catch (error: unknown) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response?.data?.msg || 'Failed to change password');
    } else if (error instanceof Error) {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Error setting up the request');
    } else {
      // Unknown error type
      throw new Error('An unknown error occurred');
    }
  }
};

//fetch appointment

export const fetchAppointments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/appointments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};

export const createAppointment = async (appointmentData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId: any, appointmentData: any) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/appointments/${appointmentId}`, appointmentData);
        return response.data;
    } catch (error) {
        console.error('Error updating appointment:', error);
        throw error;
    }
};

export const deleteAppointment = async (appointmentId: any) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/appointments/${appointmentId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting appointment:', error);
        throw error;
    }
};



//fetch unapproved users
export const fetchUnapprovedUsers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/unapproved`);
    
    // Check if the response status is 204 No Content
    if (response.status === 204) {
      return [];
    }

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};


export const approveUser = async (id: string) => {
  try {
    // Retrieve the admin token from the cookie
    const adminData = Cookies.get('adminData');
    if (!adminData) {
      throw new Error('Admin token not found');
    }
    const { token } = JSON.parse(adminData);

    const response = await fetch(`${API_BASE_URL}/api/user/approve/${id}`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
      body: JSON.stringify({ approved: true }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the approve operation:', error);
    throw error;
  }
};

//delete the users
export const deleteUser = async (id: string) => {
  try {
    // Retrieve the admin token from the cookie
    const adminData = Cookies.get('adminData');
    if (!adminData) {
      throw new Error('Admin token not found');
    }
    const { token } = JSON.parse(adminData);

    const response = await fetch(`${API_BASE_URL}/api/user/delete/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the delete operation:', error);
    throw error;
  }
};


// Fetch Doctors
export const fetchDoctors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/approved-doctors`);
    if (!response.ok) {
      throw new Error('Failed to fetch doctors');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// fetch patients
export const fetchApprovedPatients = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/approved-patients`);
    if (!response.ok) {
      throw new Error('Failed to fetch approved patients');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const updatePatientData = async (id: string, patientData: Patient) => {
  const response = await fetch(`${API_BASE_URL}/api/user/update-patient/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });

  if (!response.ok) {
    throw new Error("Failed to update patient");
  }

  return response.json();
};


//register doctor
export const registerDoctor = async (doctorData: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/register-doctor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    if (!response.ok) {
      throw new Error('Failed to register doctor');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering doctor:', error);
    throw error;
  }
};

interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
  type?: string;
  specialization?: string;
  approved?: boolean;
}

export const updateDoctor = async (id: string, payload: UpdateUserPayload) => {
  // Prepare the payload, excluding specialization if the user is not a doctor
  const { type, specialization, ...otherFields } = payload;

  // Conditionally include specialization only if type is 'doctor'
  const dataToSend: UpdateUserPayload = {
    ...otherFields,
    type,
  };

  if (type === "doctor" && specialization) {
    dataToSend.specialization = specialization;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteDoctor = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};


// Delete patient data
export const deletePatientData = async (patientId: string) => {
  const response = await axios.delete(`${API_BASE_URL}/api/user/${patientId}`);
  return response.data;
};

export const registerApprovedPatient = async (newPatient: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_BASE_URL}/api/user/register-approved-patient`, newPatient);
  return response.data;
};

// fetchUserCounts.js
export const fetchUserCounts = async () => {
  try {
      const response = await fetch(`${API_BASE_URL}/api/user/counts`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching user counts:', error);
      throw error; // Rethrow the error for handling in the component
  }
};

export const fetchAppointmentCount = async () => {
  try {
      const response = await fetch("http://localhost:5000/api/appointments/count");
      if (!response.ok) {
          throw new Error('Failed to fetch appointment count');
      }
      const data = await response.json();
      console.log('Appointment Count:', data.totalAppointments); // Log the appointment count
      return data.totalAppointments; // Return totalAppointments directly
  } 
  catch (error) {
      console.error('Error fetching appointment count:', error);
      throw error; // Rethrow the error for further handling
  }
};
