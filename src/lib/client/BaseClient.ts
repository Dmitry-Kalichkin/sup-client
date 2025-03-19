export class BaseClient {
    protected readonly API_URL = 'http://localhost:8000/api/';
    
    protected async get(url: string, params: URLSearchParams | null): Promise<Response> {
        const requestUrl: string = this.API_URL + url + (params ? '?' + params : '');
        const response = await fetch(requestUrl,{
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    }

    protected async post(url: string, body: any): Promise<Response> {
        const response = await fetch(this.API_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(body)
        });
        return response;
    }
}