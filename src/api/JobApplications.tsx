export interface jobDataType {
  id: number;
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

export async function getJobApplications(URL: string) {
  const response = await fetch(URL);
  const data: jobDataType[] = await response.json();
  return data;
}

// ****************************************

export interface tokenRequestType {
  email: string;
  password: string;
}

export interface tokenType {
  token: string;
}

export async function checkTokenExpiration(
  Body: tokenRequestType,
  URL: string
) {
  const response = await fetch(URL);
  if (response.status !== 200) {
    const response = await fetch(
      'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Body),
      }
    );
    if (response.status !== 200) {
      return response.status;
    }
    const data: Promise<tokenType> = await response.json();

    sessionStorage.setItem('token', (await data).token);
  }

  return response.status;
}
