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

export async function getJobByUser(URL: string, id: string) {
  const response = await fetch(URL + id, {
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

  const data: jobDataType = await response.json();
  return data;
}

export async function getJob(URL: string): Promise<jobDataType> {
  const response = await fetch(URL);
  const data: jobDataType = await response.json();
  return data;
}
