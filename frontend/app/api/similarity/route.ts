import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userInput } = await request.json();
    console.log('Received userInput:', userInput);
    console.log('Attempting to connect to Flask API at', process.env.NEXT_PUBLIC_BACKEND_URL);
    // Make a request to the Flask app
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/api/similarity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_input: userInput }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data. Status: ${response.status}, Message: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error while fetching data from backend:', error);
    return NextResponse.json({ 
        error: 'An error occurred while fetching data', 
        details: error.message 
    }, { status: 500 });
  }
}
