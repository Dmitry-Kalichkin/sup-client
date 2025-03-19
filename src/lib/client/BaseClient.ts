export class BaseClient {
    protected readonly API_URL = 'http://localhost:8000/api/';
    
    protected async get(url: string): Promise<Response> {
        const response = await fetch(this.API_URL + url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    }

    protected async post(url: string, body: any): Promise<Response> {
        const response = await fetch(this.API_URL + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response;
    }
}