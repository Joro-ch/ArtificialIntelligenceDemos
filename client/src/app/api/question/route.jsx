
export async function POST(req) {
    const { file_name, pregunta } = await req.json();
    const response = await fetch(`http://127.0.0.1:8000/consulta`, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_name: file_name, pregunta: pregunta }),
    });
    if (response.ok) {
        const result = await response.json();
        return Response.json(result)
    }
    return Response.json({ respuesta: "Yes" })
}