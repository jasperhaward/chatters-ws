export async function verifyToken(
    userId: string,
    token: string
): Promise<void> {
    const url = `localhost:3001/api/v1/auth/${userId}/verify`;

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
        throw new Error(`Failed to verify token: ${response.statusText}`);
    }

    return await response.json();
}
