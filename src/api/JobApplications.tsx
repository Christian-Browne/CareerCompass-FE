export interface jobDataType {
  id: string;
  title: string;
  logo: string;
  company: string;
  salary: number;
  description: string;
  date: string;
  location: string;
  status: string;
  postUrl: string;
  color: 'RED' | 'BLACK' | 'ORANGE' | 'TEAL' | 'BLUE';
}

export interface jobPostType {
  title: string;
  logo: string;
  company: string;
  salary: number;
  description: string;
  date: string;
  location: string;
  status: string;
  postUrl: string;
  color: 'RED' | 'BLACK' | 'ORANGE' | 'TEAL' | 'BLUE';
}

export interface errorLogin {
  code: number;
  message: string;
}

export async function getJobApplications(URL: string) {
  const response = await fetch(URL);
  const data: jobDataType[] = await response.json();
  return data;
}

export async function getJobApplicationsByUser(
  URL: string
): Promise<errorLogin | jobDataType[]> {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('token')}`,
    },
  });

  if (response.status === 401) {
    const error = await response.json();
    console.error(error?.message);
    return error;
  }

  const data: jobDataType[] = await response.json();
  return data;
}

export async function getJobByUser(id: string) {
  const response = await fetch(
    `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/job/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }
  );

  if (response.status === 401) {
    const error = await response.json();
    console.error(error?.message);
    return error;
  }

  const data: jobDataType = await response.json();
  return data;
}

export async function getJob(id: string): Promise<jobDataType> {
  const response = await fetch(
    `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/demo/job/${id}`
  );
  const data: jobDataType = await response.json();
  return data;
}

/*************** Post **********************/
export async function postJobByUser(id: string, body: jobPostType) {
  const response = await fetch(
    `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/job/${id}/update`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (response.status === 401) {
    const error = await response.json();
    console.error(error?.message);
    return error;
  }

  const data: jobDataType = await response.json();
  return data;
}

export async function deleteJobByUser(id: string) {
  const response = await fetch(
    `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/job/${id}/delete`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }
  );

  if (response.status === 401) {
    const error = await response.json();
    console.error(error?.message);
    return error;
  }

  if (response.status === 204) {
    return response.status;
  }
}

export async function addJobByUser(body: jobPostType) {
  const response = await fetch(
    `https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/job/add`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify(body),
    }
  );

  if (response.status === 401) {
    const error = await response.json();
    console.error(error?.message);
    return error;
  }

  const data: jobDataType = await response.json();
  return data;
}
