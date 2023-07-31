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
  color: 'RED' | 'YELLOW' | 'PURPLE' | 'ORANGE' | 'PINK' | 'TEAL' | 'BLUE';
}

export async function getJobApplications() {
  const response = await fetch(
    'https://ghrr97wg4j.execute-api.us-west-1.amazonaws.com/prod/demo'
  );
  const data: jobDataType[] = await response.json();
  return data;
}
